from dateutil import parser
from sqlmodel import Session

from infra.database import engine
from model.models import PreventiveOS, Worker
from schemas.preventive import UpdateServiceOrderParams
from utils.date_tools import differenceInMinutes


def updateServiceOrder(params: dict) -> None:
    validated = UpdateServiceOrderParams.model_validate(params)
    data = validated.data

    duration = differenceInMinutes(data.finishTime, data.startTime)

    with Session(engine) as session:
        os = session.get(PreventiveOS, validated.id)
        if os is None:
            return

        os.date = parser.parse(data.date)
        os.duration = duration
        os.startTime = parser.parse(data.startTime)
        os.finishTime = parser.parse(data.finishTime)
        os.concluded = True
        os.responsible = [session.get(Worker, worker.id) for worker in data.workers]

        session.commit()
