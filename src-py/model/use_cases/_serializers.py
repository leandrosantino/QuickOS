from model.models import (
    Machine,
    Nature,
    PreventiveAction,
    PreventiveActionTaken,
    PreventiveOS,
    Worker,
)
from schemas.preventive import (
    Action,
    ActionTaken,
    Machine as MachineDTO,
    Nature as NatureDTO,
    ServiceOrder,
    Worker as WorkerDTO,
)


def machine_to_dict(machine: Machine | None) -> dict | None:
    if machine is None:
        return None
    return {
        "id": machine.id,
        "tag": machine.tag,
        "ute": machine.ute,
        "technology": machine.technology,
    }


def nature_to_dict(nature: Nature | None) -> dict | None:
    if nature is None:
        return None
    return {"id": nature.id, "name": nature.name}


def worker_to_dict(worker: Worker) -> dict:
    return {
        "id": worker.id,
        "registration": worker.registration,
        "name": worker.name,
        "workerClass": worker.workerClass,
    }


def machine_to_dto(machine: Machine | None) -> MachineDTO | None:
    if machine is None:
        return None
    return MachineDTO.model_validate(machine_to_dict(machine))


def nature_to_dto(nature: Nature | None) -> NatureDTO | None:
    if nature is None:
        return None
    return NatureDTO.model_validate(nature_to_dict(nature))


def worker_to_dto(worker: Worker) -> WorkerDTO:
    return WorkerDTO.model_validate(worker_to_dict(worker))


def action_to_dict(action: PreventiveAction) -> dict:
    return {
        "id": action.id,
        "description": action.description,
        "machineId": action.machineId,
        "excution": action.excution,
        "frequency": action.frequency,
        "nextExecution": action.nextExecution,
        "preventiveOSId": action.preventiveOSId,
        "natureId": action.natureId,
        "ignore": action.ignore,
        "machine": machine_to_dict(action.machine),
        "nature": nature_to_dict(action.nature),
    }


def action_to_dto(action: PreventiveAction) -> Action:
    return Action.model_validate(action_to_dict(action))


def action_taken_to_dto(taken: PreventiveActionTaken) -> ActionTaken:
    return ActionTaken.model_validate(
        {
            "id": taken.id,
            "date": taken.date,
            "osId": taken.osId,
            "actionId": taken.actionId,
            "weekCode": taken.weekCode,
            "action": action_to_dto(taken.action),
        }
    )


def service_order_to_dto(os: PreventiveOS) -> ServiceOrder:
    return ServiceOrder.model_validate(
        {
            "id": os.id,
            "weekCode": os.weekCode,
            "date": os.date,
            "natureId": os.natureId,
            "duration": os.duration,
            "concluded": os.concluded,
            "startTime": os.startTime,
            "finishTime": os.finishTime,
            "machineId": os.machineId,
            "actionsUniqueKey": os.actionsUniqueKey,
            "nature": nature_to_dto(os.nature),
            "machine": machine_to_dto(os.machine),
            "responsible": [worker_to_dto(w) for w in os.responsible],
            "actions": [action_to_dto(a) for a in os.actions],
            "actionsTaken": [action_taken_to_dto(t) for t in os.actions_taken],
        }
    )


def action_to_public_dict(action: PreventiveAction) -> dict:
    data = action_to_dict(action)
    data["_count"] = {"actionsTaken": len(action.actions_taken or [])}
    return data
