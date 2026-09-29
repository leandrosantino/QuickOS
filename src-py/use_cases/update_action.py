from schemas.preventive import UpdateActionParams
from infra.prisma import prisma


async def updateAction(params: dict) -> None:
    validated = UpdateActionParams.model_validate(params)

    await prisma.preventiveaction.update(
        where={"id": validated.id},
        data=validated.data.model_dump(exclude_none=True),
    )
