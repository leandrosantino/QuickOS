from schemas.preventive import DeleteServiceOrderParams
from utils.prisma import prisma


async def deleteServiceOrder(params: dict) -> None:
    validated = DeleteServiceOrderParams.model_validate(params)

    await prisma.preventiveos.delete(
        where={"id": validated.id},
    )
