from typing import Optional

from schemas.preventive import GetServiceOrderByIdParams, ServiceOrder
from utils.prisma import prisma


async def getServiceOrderById(params: dict) -> Optional[ServiceOrder]:
    validated = GetServiceOrderByIdParams.model_validate(params)

    service_order = await prisma.preventiveos.find_unique(
        where={"id": validated.id},
        include={
            "nature": True,
            "machine": True,
            "responsible": True,
            "actions": {"include": {"nature": True, "machine": True}},
            "actionsTaken": {
                "include": {
                    "action": {"include": {"nature": True, "machine": True}},
                }
            },
        },
    )

    if service_order is None:
        return None

    return ServiceOrder.model_validate(service_order.model_dump())
