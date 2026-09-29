from flask import Blueprint, render_template
from use_cases.get_service_order_by_id import getServiceOrderById
import os

SERVICE_ORDER_TEMPLATE_FILE = os.getenv("SERVICE_ORDER_TEMPLATE_FILE", "serviceOrder.html")

render_blueprint = Blueprint("render", __name__)


@render_blueprint.get("/createServiceorder/<int:id>")
async def create_service_order(id: int):
    service_order = await getServiceOrderById({"id": id})
    if service_order is None:
        return "Service order not found", 404
    return render_template(SERVICE_ORDER_TEMPLATE_FILE, data=service_order)
