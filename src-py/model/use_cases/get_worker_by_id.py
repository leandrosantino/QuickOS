from sqlmodel import Session

from infra.database import engine
from model.models import Worker


def getWorkerById(id: int) -> Worker | None:
    with Session(engine) as session:
        return session.get(Worker, id)
