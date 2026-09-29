from flask import Flask
from flask_cors import CORS
from controllers.main_controller import main_blueprint
from controllers.preventive_controller import preventive_blueprint
from controllers.render_controller import render_blueprint
from infra import prisma
import os

SERVICE_ORDER_TEMPLATE_DIR = os.getenv("SERVICE_ORDER_TEMPLATE_DIR", "../../public")
SERVER_PORT = int(os.getenv("SERVER_PORT", 3333))

def create_app() -> Flask:
    app = Flask(__name__, template_folder=SERVICE_ORDER_TEMPLATE_DIR)
    CORS(app)
    prisma.install(app)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(preventive_blueprint)
    app.register_blueprint(render_blueprint)
    return app


def start() -> None:
    prisma.start()
    app = create_app()
    try:
        app.run(port=SERVER_PORT)
    finally:
        prisma.stop()

