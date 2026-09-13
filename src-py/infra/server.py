from flask import Flask
from flask_cors import CORS

from controllers.main_controller import main_blueprint
from controllers.preventive_controller import preventive_blueprint


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(preventive_blueprint)
    return app


def start() -> None:
    app = create_app()
    app.run(host="0.0.0.0", port=3333)
