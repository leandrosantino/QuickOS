from schemas.preventive import GetServiceOrderCountParams, ServiceOrderCount
from infra.prisma import prisma
from utils.week_tools import weekYearToString


async def getServiceOrderCount(params: dict) -> ServiceOrderCount:
    validated = GetServiceOrderCountParams.model_validate(params)
    week_code = weekYearToString(validated.week, validated.year)

    finished = await prisma.preventiveos.count(
        where={"weekCode": week_code, "concluded": True},
    )
    unfinished = await prisma.preventiveos.count(
        where={"weekCode": week_code, "concluded": False},
    )

    return ServiceOrderCount(finished=finished, unfinished=unfinished)
