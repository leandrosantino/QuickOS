from typing import Optional

from schemas.preventive import Action, GetActionByIdParams
from infra.prisma import prisma


async def getActionById(params: dict) -> Optional[Action]:
    validated = GetActionByIdParams.model_validate(params)

    action = await prisma.preventiveaction.find_unique(
        where={"id": validated.id},
        include={
            "machine": True,
            "nature": True,
        },
    )

    if action is None:
        return None

    return Action.model_validate(action.model_dump())
