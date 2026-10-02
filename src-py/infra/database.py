import os
from pathlib import Path
from typing import Iterator

from sqlmodel import Session, create_engine, Engine

_PROJECT_ROOT = Path(__file__).resolve().parents[2]


def _database_url() -> str:
    url = os.getenv("DATABASE_URL", "file:./database/app.db")

    if url.startswith("file:"):
        path = Path(url[len("file:"):])
        if not path.is_absolute():
            path = _PROJECT_ROOT / path
        return f"sqlite:///{path.as_posix()}"

    return url


engine: Engine = create_engine(
    _database_url(),
    connect_args={"check_same_thread": False},
)


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session
