"""Geração de PDF da janela da OS.

O pywebview 6.2.1 não expõe API de impressão — só o backend do macOS tem algo
equivalente (``platforms/cocoa.py``). No backend Qt em uso aqui, o PDF sai do
QtWebEngine: ``QWebEnginePage.printToPdf(filePath, layout)`` grava o arquivo e
emite ``pdfPrintingFinished``, sem callback Python.

Já o botão "Imprimir" não passa por aqui: usa ``window.print()`` na página, que
o QtWebEngine entrega ao diálogo do sistema via ``QWebEnginePage.printRequested``.

Objetos do Qt só podem ser tocados pela thread que os criou. Os métodos expostos
via ``js_api`` rodam numa thread nova por chamada (``webview/util.py``), então
todo acesso ao Qt precisa ser marshalled para a thread da GUI.
"""

import threading
from typing import Any, Callable, TypeVar

from PyQt6.QtCore import QMarginsF
from PyQt6.QtGui import QPageLayout, QPageSize

import webview
from webview.platforms import qt

T = TypeVar("T")

_PDF_TIMEOUT = 30.0
_GUI_TIMEOUT = 120.0


def _page(window: webview.Window) -> Any:
    """Chega ao ``QWebEnginePage`` a partir da janela do pywebview.

    ``Window.native`` é o ``BrowserView`` (mesmo objeto de
    ``BrowserView.instances[uid]``), cujo atributo ``webview`` é o
    ``QWebEngineView``.
    """
    return window.native.webview.page()


def _run_on_gui_thread(func: Callable[[], T]) -> T:
    """Executa ``func`` na thread da GUI e devolve o resultado.

    Reaproveita o sinal que o próprio pywebview usa para criar janelas a partir
    de outras threads: seu slot apenas chama a função recebida.
    """
    done = threading.Event()
    box: dict[str, Any] = {}

    def wrapper() -> None:
        try:
            box["result"] = func()
        except BaseException as exc:  # noqa: BLE001 - reerguido no chamador
            box["error"] = exc
        finally:
            done.set()

    instances = list(qt.BrowserView.instances.values())
    if not instances:
        raise RuntimeError("Nenhuma janela Qt disponível para imprimir")
    instances[0].create_window_trigger.emit(wrapper)

    if not done.wait(timeout=_GUI_TIMEOUT):
        raise TimeoutError("A thread da GUI não respondeu a tempo")
    if "error" in box:
        raise box["error"]
    return box["result"]


def _a4_layout(margin_mm: float = 10) -> QPageLayout:
    """Layout A4 com margens em milímetros.

    A unidade precisa ser explícita: o padrão de ``QPageLayout`` é ``Point``, e
    ``QMarginsF(10, 10, 10, 10)`` sem ``Unit.Millimeter`` daria 10pt (~3,5mm).
    """
    return QPageLayout(
        QPageSize(QPageSize.PageSizeId.A4),
        QPageLayout.Orientation.Portrait,
        QMarginsF(margin_mm, margin_mm, margin_mm, margin_mm),
        QPageLayout.Unit.Millimeter,
    )


def print_pdf(window: webview.Window, path: str) -> str:
    """Grava a página da ``window`` como PDF em ``path`` e devolve o caminho."""
    done = threading.Event()
    box: dict[str, Any] = {}

    def on_finished(file_path: str, success: bool) -> None:
        box["path"] = file_path
        box["success"] = success
        done.set()

    def start() -> None:
        page = _page(window)
        page.pdfPrintingFinished.connect(on_finished)
        page.printToPdf(path, _a4_layout())

    _run_on_gui_thread(start)

    if not done.wait(timeout=_PDF_TIMEOUT):
        raise TimeoutError("A geração do PDF não terminou a tempo")
    if not box.get("success"):
        raise RuntimeError(f"Não foi possível gravar o PDF em {path}")
    return box["path"]
