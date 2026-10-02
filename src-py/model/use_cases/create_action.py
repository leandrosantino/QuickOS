from sqlmodel import Session

from infra.database import engine
from model.models import PreventiveAction
from schemas.preventive import ActionCreate


def createAction(params: dict) -> None:
    validated = ActionCreate.model_validate(params)

    with Session(engine) as session:
        action = PreventiveAction.model_validate(
            validated.model_dump(exclude_none=True)
        )
        session.add(action)
        session.commit()
