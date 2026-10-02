from sqlmodel import Session

from infra.database import engine
from model.models import PreventiveAction
from schemas.preventive import UpdateActionParams


def updateAction(params: dict) -> None:
    validated = UpdateActionParams.model_validate(params)

    with Session(engine) as session:
        action = session.get(PreventiveAction, validated.id)
        if action is None:
            return
        action.sqlmodel_update(validated.data.model_dump(exclude_none=True))
        session.add(action)
        session.commit()
