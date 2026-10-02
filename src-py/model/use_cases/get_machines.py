from sqlmodel import Session, select

from infra.database import engine
from model.models import Machine


def getMachines() -> list[Machine]:
    with Session(engine) as session:
        return list(session.exec(select(Machine)).all())
