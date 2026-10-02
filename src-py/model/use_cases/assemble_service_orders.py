from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from infra.database import engine
from model.models import (
    Machine,
    Nature,
    PreventiveAction,
    PreventiveActionTaken,
    PreventiveOS,
)
from model.use_cases._serializers import service_order_to_dto
from schemas.preventive import AssembleServiceOrdersParams, ServiceOrder
from utils.week_tools import weekYearToString


def _generate_actions_unique_key(actions: list[PreventiveAction]) -> str:
    key = ""
    for action in actions:
        key += f"A-I{action.id}/M{action.machineId}/N{action.natureId}_"
    return key


def _proofreader_database(session: Session, week_code: str) -> None:
    os_list = session.exec(
        select(PreventiveOS)
        .where(PreventiveOS.weekCode == week_code)
        .options(
            selectinload(PreventiveOS.actions),
            selectinload(PreventiveOS.actions_taken),
        )
    ).all()
    for entry in os_list:
        if not entry.actions and not entry.actions_taken:
            session.delete(entry)


def assembleServiceOrders(params: dict) -> list[ServiceOrder]:
    validated = AssembleServiceOrdersParams.model_validate(params)

    result: list[ServiceOrder] = []

    week_code = weekYearToString(validated.week, validated.year)
    concluded = validated.status == "true"

    with Session(engine) as session:
        machines = list(session.exec(select(Machine)).all())
        natures = list(session.exec(select(Nature)).all())

        for machine in machines:
            if machine.id != validated.machine and validated.machine != -1:
                continue

            for nature in natures:
                if nature.id != validated.nature and validated.nature != -1:
                    continue

                actions = session.exec(
                    select(PreventiveAction)
                    .where(
                        PreventiveAction.nextExecution == week_code,
                        PreventiveAction.machineId == machine.id,
                        PreventiveAction.natureId == nature.id,
                        PreventiveAction.ignore.is_(False),
                    )
                    .options(
                        selectinload(PreventiveAction.machine),
                        selectinload(PreventiveAction.nature),
                        selectinload(PreventiveAction.actions_taken),
                    )
                ).all()

                actions_unique_key = _generate_actions_unique_key(actions)

                if len(actions) > 0 and not concluded:
                    os = session.exec(
                        select(PreventiveOS).where(
                            PreventiveOS.machineId == machine.id,
                            PreventiveOS.natureId == nature.id,
                            PreventiveOS.weekCode == week_code,
                            PreventiveOS.actionsUniqueKey == actions_unique_key,
                        )
                    ).first()

                    if os is None:
                        os = PreventiveOS(
                            machineId=machine.id,
                            weekCode=week_code,
                            natureId=nature.id,
                            actionsUniqueKey=actions_unique_key,
                        )
                        session.add(os)
                        session.flush()

                    os.machine = machine
                    os.nature = nature
                    for action in actions:
                        action.preventive_os = os

                    session.flush()
                    result.append(service_order_to_dto(os))

                if concluded or validated.status == "all":
                    os_list = session.exec(
                        select(PreventiveOS)
                        .where(
                            PreventiveOS.weekCode == week_code,
                            PreventiveOS.machineId == machine.id,
                            PreventiveOS.natureId == nature.id,
                            PreventiveOS.concluded.is_(True),
                        )
                        .options(
                            selectinload(PreventiveOS.responsible),
                            selectinload(PreventiveOS.nature),
                            selectinload(PreventiveOS.machine),
                            selectinload(PreventiveOS.actions_taken)
                            .selectinload(PreventiveActionTaken.action)
                            .selectinload(PreventiveAction.nature),
                            selectinload(PreventiveOS.actions_taken)
                            .selectinload(PreventiveActionTaken.action)
                            .selectinload(PreventiveAction.machine),
                        )
                    ).all()
                    result.extend(service_order_to_dto(entry) for entry in os_list)

        _proofreader_database(session, week_code)
        session.commit()

    return result
