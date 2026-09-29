"""Conexão única e de longa duração com o Prisma.

O Flask roda views `async` através de `asgiref.sync.async_to_sync`, que cria um
`ThreadPoolExecutor` e um `asyncio.run()` novos a cada requisição. O client async
do Prisma amarra seu pool HTTP e o subprocesso do query-engine ao event loop em que
foi conectado, então reutilizá-lo entre esses loops descartáveis levanta
`RuntimeError: Event loop is closed`.

Por isso mantemos um único event loop vivo numa thread dedicada, conectamos o client
uma vez ali, e desviamos as views async do Flask para esse mesmo loop via
`ensure_sync`. Assim todas as rotas compartilham uma única conexão durante toda a
vida do processo.
"""

import asyncio
import atexit
import signal
import threading
from typing import Any, Awaitable, Coroutine, TypeVar

from flask import Flask
from prisma import Prisma

T = TypeVar("T")

prisma = Prisma()

_loop: asyncio.AbstractEventLoop | None = None
_thread: threading.Thread | None = None
_started = False
_start_lock = threading.Lock()
_boot_error: BaseException | None = None


async def _connect() -> None:
    if not prisma.is_connected():
        await prisma.connect()


async def _disconnect() -> None:
    if prisma.is_connected():
        await prisma.disconnect()


def _run_loop() -> None:
    global _loop, _boot_error
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    _loop = loop
    try:
        loop.run_until_complete(_connect())
    except BaseException as exc:
        # Sem isso, _loop continuaria apontando para um loop morto e stop()/run()
        # tentariam reutilizá-lo.
        _boot_error = exc
        _loop = None
        loop.close()
        raise
    loop.run_forever()
    # Saída graciosa: desconecta no próprio loop antes de fechá-lo.
    try:
        loop.run_until_complete(_disconnect())
    finally:
        loop.run_until_complete(loop.shutdown_asyncgens())
        loop.close()
        _loop = None


def start() -> None:
    """Sobe o loop dedicado e conecta uma única vez. Idempotente."""
    global _thread, _started
    with _start_lock:
        if _started:
            return
        _started = True

        _thread = threading.Thread(target=_run_loop, name="prisma-loop", daemon=True)
        _thread.start()

        # Espera o loop estar rodando para garantir que a conexão foi feita.
        while _loop is None or not _loop.is_running():
            if not _thread.is_alive():
                _started = False
                raise RuntimeError(
                    f"A thread do loop do Prisma morreu durante o boot: {_boot_error}"
                )
            threading.Event().wait(0.01)

        atexit.register(stop)
        # signal.signal só funciona na main thread.
        if threading.current_thread() is threading.main_thread():
            for sig in (signal.SIGINT, signal.SIGTERM):
                signal.signal(sig, _handle_signal)


def _handle_signal(signum: int, _frame: Any) -> None:
    stop()
    # Restaura o comportamento padrão para o processo realmente encerrar.
    signal.signal(signum, signal.SIG_DFL)
    import os

    os.kill(os.getpid(), signum)


def stop() -> None:
    """Desconecta, para o loop e encerra a thread. Idempotente e seguro em sinais."""
    global _loop, _thread, _started
    loop, thread = _loop, _thread
    if loop is None or thread is None:
        return

    if loop.is_running():
        try:
            asyncio.run_coroutine_threadsafe(_disconnect(), loop).result(timeout=10)
        except Exception:
            pass
        loop.call_soon_threadsafe(loop.stop)

    if thread.is_alive() and thread is not threading.current_thread():
        thread.join(timeout=10)

    _loop = None
    _thread = None
    _started = False


def run(coro: Coroutine[Any, Any, T]) -> T:
    """Executa a coroutine no loop dedicado e bloqueia até obter o resultado."""
    if _loop is None or not _loop.is_running():
        start()
    assert _loop is not None
    return asyncio.run_coroutine_threadsafe(coro, _loop).result()


def install(app: Flask) -> None:
    """Faz o Flask despachar views async para o loop dedicado do Prisma."""

    def ensure_sync(func: Any) -> Any:
        if asyncio.iscoroutinefunction(func):

            def wrapper(*args: Any, **kwargs: Any) -> Any:
                return run(func(*args, **kwargs))

            wrapper.__name__ = getattr(func, "__name__", "view")
            return wrapper

        return func

    app.ensure_sync = ensure_sync  # type: ignore[method-assign]
