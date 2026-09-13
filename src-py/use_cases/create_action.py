from schemas.preventive import ActionCreate
from infra.prisma import prisma


async def createAction(params: dict) -> None:
    validated = ActionCreate.model_validate(params)

    await prisma.preventiveaction.create(
        data=validated.model_dump(exclude_none=True),
    )
