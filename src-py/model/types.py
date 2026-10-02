from datetime import datetime, timezone

from sqlalchemy import BigInteger
from sqlalchemy.types import TypeDecorator


class PrismaDateTime(TypeDecorator):
    """Converte `datetime` <-> epoch em milissegundos (formato gravado pelo Prisma).

    O Prisma grava `DateTime` no SQLite como `INTEGER` contendo milissegundos desde
    o Unix epoch e devolve `datetime` aware em UTC (serializado como `...Z`). Este
    tipo mantém essa representação para que o `app.db` existente continue legível.
    """

    impl = BigInteger
    cache_ok = True

    def process_bind_param(self, value: datetime | None, dialect) -> int | None:
        if value is None:
            return None
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)
        return int(value.timestamp() * 1000)

    def process_result_value(self, value: int | None, dialect) -> datetime | None:
        if value is None:
            return None
        return datetime.fromtimestamp(value / 1000, tz=timezone.utc)
