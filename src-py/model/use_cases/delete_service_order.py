from sqlmodel import Session

from infra.database import engine
from model.models import PreventiveOS
from schemas.preventive import DeleteServiceOrderParams


def deleteServiceOrder(params: dict) -> None:
    validated = DeleteServiceOrderParams.model_validate(params)

    with Session(engine) as session:
        os = session.get(PreventiveOS, validated.id)
        if os is None:
            return
        session.delete(os)
        session.commit()
