from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from infra.database import engine
from model.models import PreventiveAction
from model.use_cases._serializers import action_to_dto
from schemas.preventive import Action, GetActionByIdParams


def getActionById(params: dict) -> Action | None:
    validated = GetActionByIdParams.model_validate(params)

    statement = (
        select(PreventiveAction)
        .where(PreventiveAction.id == validated.id)
        .options(
            selectinload(PreventiveAction.machine),
            selectinload(PreventiveAction.nature),
        )
    )

    with Session(engine) as session:
        action = session.exec(statement).first()
        if action is None:
            return None
        return action_to_dto(action)
