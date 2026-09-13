from flask import Blueprint, jsonify

from repositories.machine_repository import getMachines
from repositories.nature_repository import getNatures
from repositories.worker_repository import getWorkerById, getWorkerByRegistration, getWorkers

main_blueprint = Blueprint("main", __name__, url_prefix="/main")


@main_blueprint.get("/machines")
async def machines():
    result = await getMachines()
    return jsonify([machine.model_dump(mode="json") for machine in result])


@main_blueprint.get("/natures")
async def natures():
    result = await getNatures()
    return jsonify([nature.model_dump(mode="json") for nature in result])


@main_blueprint.get("/workers")
async def workers():
    result = await getWorkers()
    return jsonify([worker.model_dump(mode="json") for worker in result])


@main_blueprint.get("/workers/registration/<int:registration>")
async def workers_by_registration(registration: int):
    worker = await getWorkerByRegistration(registration)
    if worker is None:
        return jsonify(None), 404
    return jsonify(worker.model_dump(mode="json"))


@main_blueprint.get("/workers/<int:id>")
async def worker(id: int):
    worker = await getWorkerById(id)
    if worker is None:
        return jsonify(None), 404
    return jsonify(worker.model_dump(mode="json"))
