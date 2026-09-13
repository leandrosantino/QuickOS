from flask import Blueprint, jsonify, request

from infra.prisma import with_prisma
from use_cases.assemble_service_orders import assembleServiceOrders
from use_cases.create_action import createAction
from use_cases.delete_action import deleteAction
from use_cases.delete_service_order import deleteServiceOrder
from use_cases.execute_service_orders import executeServiceOrders
from use_cases.get_actions import getActions
from use_cases.get_service_order_by_id import getServiceOrderById
from use_cases.get_service_order_count import getServiceOrderCount
from use_cases.update_action import updateAction
from use_cases.update_service_order import updateServiceOrder

preventive_blueprint = Blueprint("preventive", __name__, url_prefix="/preventive")

SUCCESS_RESPONSE = {"message": "Successfully performed operation!", "code": 200}


@preventive_blueprint.post("/service-orders")
@with_prisma
async def get_service_orders():
    body = request.get_json(force=True)
    result = await assembleServiceOrders(body)
    return jsonify([service_order.model_dump(mode="json") for service_order in result])


@preventive_blueprint.get("/service-orders/<int:id>")
@with_prisma
async def get_service_order_by_id(id: int):
    service_order = await getServiceOrderById({"id": id})
    if service_order is None:
        return jsonify(None), 404
    return jsonify(service_order.model_dump(mode="json"))


@preventive_blueprint.put("/service-orders/<int:id>")
@with_prisma
async def update_service_order(id: int):
    body = request.get_json(force=True)
    await updateServiceOrder({"id": id, "data": body.get("data")})
    return jsonify(SUCCESS_RESPONSE)


@preventive_blueprint.delete("/service-orders/<int:id>")
@with_prisma
async def delete_service_order(id: int):
    await deleteServiceOrder({"id": id})
    return jsonify(SUCCESS_RESPONSE)


@preventive_blueprint.post("/service-orders/execute")
@with_prisma
async def execute_service_orders():
    body = request.get_json(force=True)
    await executeServiceOrders(body)
    return jsonify(SUCCESS_RESPONSE)


@preventive_blueprint.get("/actions")
@with_prisma
async def get_actions():
    params = {
        "searchText": request.args.get("searchText", ""),
        "weekCode": request.args.get("weekCode", ""),
        "machineId": request.args.get("machineId", -1, type=int),
        "natureId": request.args.get("natureId", -1, type=int),
        "showIgnore": request.args.get("showIgnore", "false"),
        "limit": request.args.get("limit", type=int),
        "cursor": request.args.get("cursor", type=int),
    }
    result = await getActions(params)
    return jsonify([action.model_dump(mode="json") for action in result])


@preventive_blueprint.post("/actions")
@with_prisma
async def create_action():
    body = request.get_json(force=True)
    await createAction(body)
    return jsonify(SUCCESS_RESPONSE)


@preventive_blueprint.put("/actions/<int:id>")
@with_prisma
async def update_action(id: int):
    body = request.get_json(force=True)
    await updateAction({"id": id, "data": body.get("data")})
    return jsonify(SUCCESS_RESPONSE)


@preventive_blueprint.delete("/actions/<int:id>")
@with_prisma
async def delete_action(id: int):
    await deleteAction({"id": id})
    return jsonify(SUCCESS_RESPONSE)


@preventive_blueprint.get("/service-orders/count")
@with_prisma
async def get_service_order_count():
    params = {
        "week": request.args.get("week", type=int),
        "year": request.args.get("year", type=int),
    }
    result = await getServiceOrderCount(params)
    return jsonify(result.model_dump())
