from dateutil import parser

from schemas.preventive import ExecuteServiceOrdersParams
from utils.date_tools import differenceInMinutes
from infra.prisma import prisma
from utils.week_tools import incrementWeekYear, weekYearStringToNumber, weekYearToString


async def executeServiceOrders(params: dict):
    validated = ExecuteServiceOrdersParams.model_validate(params)

    duration = differenceInMinutes(validated.finishTime, validated.startTime)

    os = await prisma.preventiveos.update(
        where={"id": validated.id},
        data={
            "date": parser.parse(validated.date),
            "responsible": {"connect": [{"id": worker.id} for worker in validated.workers]},
            "duration": duration,
            "startTime": parser.parse(validated.startTime),
            "finishTime": parser.parse(validated.finishTime),
            "concluded": True,
        },
        include={"actions": True},
    )

    for action in os.actions or []:
        week_year_number = weekYearStringToNumber(action.nextExecution)
        next_week = incrementWeekYear(
            week_year_number["week"],
            week_year_number["year"],
            action.frequency,
        )
        next_week_string = weekYearToString(next_week["week"], next_week["year"])

        await prisma.preventiveaction.update(
            where={"id": action.id},
            data={"nextExecution": next_week_string},
        )

        await prisma.preventiveactiontaken.create(
            data={
                "date": parser.parse(validated.date),
                "weekCode": os.weekCode,
                "actionId": action.id,
                "osId": os.id,
            },
        )

    return os
