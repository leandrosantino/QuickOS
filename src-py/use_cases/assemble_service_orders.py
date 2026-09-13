from schemas.preventive import AssembleServiceOrdersParams
from utils.prisma import prisma
from utils.week_tools import weekYearToString


def _generate_actions_unique_key(actions: list) -> str:
    key = ""
    for action in actions:
        key += f"A-I{action.id}/M{action.machineId}/N{action.natureId}_"
    return key


async def _proofreader_database(week_code: str) -> None:
    os_list = await prisma.preventiveos.find_many(
        where={"weekCode": week_code},
        include={"actions": True, "actionsTaken": True},
    )
    for entry in os_list:
        if not entry.actions and not entry.actionsTaken:
            await prisma.preventiveos.delete(where={"id": entry.id})


async def _register_service_orders(
    machine_id: int,
    week_code: str,
    actions: list,
    nature_id: int,
    actions_unique_key: str,
):
    os_data = {
        "machineId": machine_id,
        "weekCode": week_code,
        "natureId": nature_id,
        "actionsUniqueKey": actions_unique_key,
        "actions": {"connect": [{"id": action.id} for action in actions]},
    }

    return await prisma.preventiveos.upsert(
        where={
            "machineId_natureId_weekCode_actionsUniqueKey": {
                "machineId": machine_id,
                "weekCode": week_code,
                "natureId": nature_id,
                "actionsUniqueKey": actions_unique_key,
            },
        },
        data={"create": os_data, "update": os_data},
        include={
            "actions": {"include": {"nature": True, "machine": True}},
            "nature": True,
            "machine": True,
        },
    )


async def assembleServiceOrders(params: dict) -> list:
    validated = AssembleServiceOrdersParams.model_validate(params)

    result: list = []

    machines = await prisma.machine.find_many()
    natures = await prisma.nature.find_many()
    week_code = weekYearToString(validated.week, validated.year)

    concluded = validated.status == "true"

    for machine in machines:
        if machine.id == validated.machine or validated.machine == -1:
            for nature in natures:
                if nature.id == validated.nature or validated.nature == -1:
                    actions = await prisma.preventiveaction.find_many(
                        where={
                            "nextExecution": week_code,
                            "machineId": machine.id,
                            "natureId": nature.id,
                            "ignore": False,
                        },
                        include={
                            "machine": True,
                            "nature": True,
                            "actionsTaken": True,
                        },
                    )

                    actions_unique_key = _generate_actions_unique_key(actions)

                    if len(actions) > 0 and not concluded:
                        result.append(
                            await _register_service_orders(
                                machine.id,
                                week_code,
                                actions,
                                nature.id,
                                actions_unique_key,
                            )
                        )

                    if concluded or validated.status == "all":
                        os_list = await prisma.preventiveos.find_many(
                            where={
                                "weekCode": week_code,
                                "machineId": machine.id,
                                "natureId": nature.id,
                                "concluded": True,
                            },
                            include={
                                "responsible": True,
                                "nature": True,
                                "machine": True,
                                "actionsTaken": {
                                    "include": {
                                        "action": {"include": {"nature": True, "machine": True}},
                                    }
                                },
                            },
                        )
                        result.extend(os_list)

    await _proofreader_database(week_code)

    return result
