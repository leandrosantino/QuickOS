from sqlmodel import Session

from infra.database import engine
from model.models import PreventiveAction
from schemas.preventive import DeleteActionParams


def deleteAction(params: dict) -> None:
    validated = DeleteActionParams.model_validate(params)

    with Session(engine) as session:
        action = session.get(PreventiveAction, validated.id)
        if action is None:
            return
        session.delete(action)
        session.commit()
