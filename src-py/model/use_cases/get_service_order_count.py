from sqlalchemy import func
from sqlmodel import Session, select

from infra.database import engine
from model.models import PreventiveOS
from schemas.preventive import GetServiceOrderCountParams, ServiceOrderCount
from utils.week_tools import weekYearToString


def getServiceOrderCount(params: dict) -> ServiceOrderCount:
    validated = GetServiceOrderCountParams.model_validate(params)
    week_code = weekYearToString(validated.week, validated.year)

    with Session(engine) as session:
        finished = session.exec(
            select(func.count())
            .select_from(PreventiveOS)
            .where(
                PreventiveOS.weekCode == week_code,
                PreventiveOS.concluded.is_(True),
            )
        ).one()
        unfinished = session.exec(
            select(func.count())
            .select_from(PreventiveOS)
            .where(
                PreventiveOS.weekCode == week_code,
                PreventiveOS.concluded.is_(False),
            )
        ).one()

    return ServiceOrderCount(finished=finished, unfinished=unfinished)
