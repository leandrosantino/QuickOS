from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from infra.database import engine
from model.models import PreventiveAction
from model.use_cases._serializers import action_to_public_dict
from schemas.preventive import GetActionsParams


def getActions(params: dict) -> list[dict]:
    validated = GetActionsParams.model_validate(params)

    conditions = [PreventiveAction.description.contains(validated.searchText)]
    if validated.machineId >= 0:
        conditions.append(PreventiveAction.machineId == validated.machineId)
    if validated.natureId >= 0:
        conditions.append(PreventiveAction.natureId == validated.natureId)
    if validated.weekCode != "":
        conditions.append(PreventiveAction.nextExecution == validated.weekCode)
    if not validated.showIgnore:
        conditions.append(PreventiveAction.ignore.is_(False))

    statement = select(PreventiveAction).where(*conditions).order_by(PreventiveAction.id)

    if validated.cursor is not None:
        if validated.cursor == 1:
            statement = statement.where(PreventiveAction.id >= validated.cursor)
        else:
            statement = statement.where(PreventiveAction.id > validated.cursor)
    if validated.limit is not None:
        statement = statement.limit(validated.limit)

    statement = statement.options(
        selectinload(PreventiveAction.nature),
        selectinload(PreventiveAction.machine),
        selectinload(PreventiveAction.actions_taken),
    )

    with Session(engine) as session:
        actions = list(session.exec(statement).all())
        return [action_to_public_dict(action) for action in actions]
