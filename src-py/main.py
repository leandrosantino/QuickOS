from rich.console import Console
from infra.server import start
import threading
import webview
from web_view_api import WebviewApi
import os

from dotenv import load_dotenv
load_dotenv()

if __name__ == "__main__a":
    start()

if __name__ == "__main__":
    MODE = os.getenv("MODE", "production")
    API_URL = os.getenv("API_URL", "")
    DEV_URL = os.getenv("DEV_URL", "")
    
    Console().print(MODE)
    Console().print(API_URL)
    Console().print(DEV_URL)

    url = "view/index.html"
    if MODE == "development":
        url = DEV_URL
    
    api = WebviewApi(API_URL)
    width = 1350
    height = 900

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

    webview.start(debug=MODE == "development")
