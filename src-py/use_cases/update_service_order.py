from dateutil import parser

from schemas.preventive import UpdateServiceOrderParams
from utils.date_tools import differenceInMinutes
from infra.prisma import prisma


async def updateServiceOrder(params: dict) -> None:
    validated = UpdateServiceOrderParams.model_validate(params)
    data = validated.data

    duration = differenceInMinutes(data.finishTime, data.startTime)

    await prisma.preventiveos.update(
        where={"id": validated.id},
        data={
            "date": parser.parse(data.date),
            "duration": duration,
            "startTime": parser.parse(data.startTime),
            "finishTime": parser.parse(data.finishTime),
            "concluded": True,
            "responsible": {
                "set": [{"id": worker.id} for worker in data.workers]
            },
        },
    )
