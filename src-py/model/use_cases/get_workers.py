from sqlmodel import Session, select

from infra.database import engine
from model.models import Worker


def getWorkers() -> list[Worker]:
    with Session(engine) as session:
        return list(session.exec(select(Worker)).all())
