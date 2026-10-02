from dateutil import parser
from sqlmodel import Session, select

from infra.database import engine
from model.models import PreventiveAction, PreventiveActionTaken, PreventiveOS, Worker
from schemas.preventive import ExecuteServiceOrdersParams
from utils.date_tools import differenceInMinutes
from utils.week_tools import incrementWeekYear, weekYearStringToNumber, weekYearToString


def executeServiceOrders(params: dict) -> PreventiveOS | None:
    validated = ExecuteServiceOrdersParams.model_validate(params)

    duration = differenceInMinutes(validated.finishTime, validated.startTime)

    with Session(engine) as session:
        os = session.get(PreventiveOS, validated.id)
        if os is None:
            return None

        os.date = parser.parse(validated.date)
        os.duration = duration
        os.startTime = parser.parse(validated.startTime)
        os.finishTime = parser.parse(validated.finishTime)
        os.concluded = True
        os.responsible = [session.get(Worker, worker.id) for worker in validated.workers]

        actions = session.exec(
            select(PreventiveAction).where(PreventiveAction.preventiveOSId == os.id)
        ).all()

        for action in actions:
            week_year_number = weekYearStringToNumber(action.nextExecution)
            next_week = incrementWeekYear(
                week_year_number["week"],
                week_year_number["year"],
                action.frequency,
            )
            next_week_string = weekYearToString(next_week["week"], next_week["year"])

            action.nextExecution = next_week_string

            session.add(
                PreventiveActionTaken(
                    date=parser.parse(validated.date),
                    weekCode=os.weekCode,
                    actionId=action.id,
                    osId=os.id,
                )
            )

        session.commit()

    return os
