from functools import wraps
from typing import Any, Callable, Coroutine, TypeVar

from prisma import Prisma

prisma = Prisma()

T = TypeVar("T")


async def connect() -> None:
    if not prisma.is_connected():
        await prisma.connect()


async def disconnect() -> None:
    if prisma.is_connected():
        await prisma.disconnect()


def with_prisma(view: Callable[..., Coroutine[Any, Any, T]]) -> Callable[..., Coroutine[Any, Any, T]]:
    @wraps(view)
    async def wrapper(*args: Any, **kwargs: Any) -> T:
        await connect()
        try:
            return await view(*args, **kwargs)
        finally:
            await disconnect()

    return wrapper
