from schemas.preventive import DeleteActionParams
from infra.prisma import prisma


async def deleteAction(params: dict) -> None:
    validated = DeleteActionParams.model_validate(params)

    await prisma.preventiveaction.delete(
        where={"id": validated.id},
    )
