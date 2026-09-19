from infra.server import start
from infra.printing import print_pdf
import threading
import webview
from dotenv import load_dotenv
from api.main_window_controller import MainWindowController
import os

load_dotenv()

# if __name__ == "__main__":
#     start()

if __name__ == "__main__":
    global window
    NODE_ENV = os.getenv("NODE_ENV", "development")

    url = "view/index.html"
    if NODE_ENV == "development":
        url = "http://localhost:5173/"

    api = MainWindowController()
    width = 1280
    height = 860

    window = webview.create_window(
        "Sistema de Preventivas",
        url,
        width=width,
        height=height,
        min_size=(width, height),
        js_api=api,
    )

    assert window
    api._bind(window)

    server_thread = threading.Thread(target=start, name="flask-server", daemon=True)
    server_thread.start()

    webview.start(debug=NODE_ENV == "development")
