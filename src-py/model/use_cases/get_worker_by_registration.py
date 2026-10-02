from sqlmodel import Session, select

from infra.database import engine
from model.models import Worker


def getWorkerByRegistration(registration: int) -> Worker | None:
    with Session(engine) as session:
        return session.exec(
            select(Worker).where(Worker.registration == registration)
        ).first()
