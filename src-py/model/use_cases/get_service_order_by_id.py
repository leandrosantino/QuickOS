from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from infra.database import engine
from model.models import PreventiveAction, PreventiveActionTaken, PreventiveOS
from model.use_cases._serializers import service_order_to_dto
from schemas.preventive import GetServiceOrderByIdParams, ServiceOrder


def getServiceOrderById(params: dict) -> ServiceOrder | None:
    validated = GetServiceOrderByIdParams.model_validate(params)

    statement = (
        select(PreventiveOS)
        .where(PreventiveOS.id == validated.id)
        .options(
            selectinload(PreventiveOS.nature),
            selectinload(PreventiveOS.machine),
            selectinload(PreventiveOS.responsible),
            selectinload(PreventiveOS.actions).selectinload(PreventiveAction.nature),
            selectinload(PreventiveOS.actions).selectinload(PreventiveAction.machine),
            selectinload(PreventiveOS.actions_taken)
            .selectinload(PreventiveActionTaken.action)
            .selectinload(PreventiveAction.nature),
            selectinload(PreventiveOS.actions_taken)
            .selectinload(PreventiveActionTaken.action)
            .selectinload(PreventiveAction.machine),
        )
    )

    with Session(engine) as session:
        service_order = session.exec(statement).first()
        if service_order is None:
            return None
        return service_order_to_dto(service_order)
