from schemas.preventive import GetActionsParams
from infra.prisma import prisma


async def getActions(params: dict) -> list[dict]:
    validated = GetActionsParams.model_validate(params)

    next_execution = validated.weekCode

    where: dict = {
        "OR": [{"description": {"contains": validated.searchText}}],
    }
    if validated.machineId >= 0:
        where["machineId"] = validated.machineId
    if validated.natureId >= 0:
        where["natureId"] = validated.natureId
    if next_execution != "":
        where["nextExecution"] = next_execution
    if not validated.showIgnore:
        where["ignore"] = False

    query: dict = {
        "skip": 0 if validated.cursor == 1 else 1,
        "take": validated.limit,
        "order": {"id": "asc"},
        "where": where,
        "include": {
            "nature": True,
            "machine": True,
            "actionsTaken": True,
        },
    }
    if validated.cursor is not None:
        query["cursor"] = {"id": validated.cursor}

    actions = await prisma.preventiveaction.find_many(**query)

    result: list[dict] = []
    for action in actions:
        data = action.model_dump(mode="json")
        count = len(data.pop("actionsTaken", []) or [])
        data["_count"] = {"actionsTaken": count}
        result.append(data)

    return result
