from sqlmodel import Session, select

from infra.database import engine
from model.models import Nature


def getNatures() -> list[Nature]:
    with Session(engine) as session:
        return list(session.exec(select(Nature)).all())
