from infra.server import start
from infra.printing import print_pdf
import threading
import webview
from dotenv import load_dotenv
import os
load_dotenv()

API_URL = "http://localhost:3333"


class Api:
    """Ponte exposta ao JS via ``window.pywebview.api``.

    Os nomes dos métodos são usados literalmente como chave no JS — o pywebview
    não converte snake_case para camelCase (``webview/util.py``).
    """

    def __init__(self) -> None:
        self._main: webview.Window | None = None
        self._service_order_window: webview.Window | None = None

    def _bind(self, main_window: webview.Window) -> None:
        """Vincula a janela principal, criada depois da instância da API.

        Privado de propósito: o pywebview expõe todo método público como
        ``window.pywebview.api.<nome>``, e o renderer não deve poder rebindar.
        """
        self._main = main_window

    def print_service_order(self, args: dict) -> dict:
        """Abre a janela de impressão da OS. Equivale à rota IPC ``printServiceOrder``."""
        from webview import windows  # local: `webview.windows` só existe após o start

        order_id = (args or {}).get("id")
        if order_id is None:
            return {"opened": False, "reason": "missing_id"}

        # Só uma janela por vez: reexibe a existente em vez de abrir outra.
        existing = self._service_order_window
        if existing is not None and any(w.uid == existing.uid for w in windows):
            try:
                existing.restore()
                existing.show()
            except Exception:
                pass
            return {"opened": False, "reason": "already_open"}

        self._service_order_window = webview.create_window(
            "Ordem de Serviço Preventiva",
            f"{API_URL}/createServiceorder/{order_id}",
            width=900,
            height=700,
            resizable=True,
        )
        return {"opened": True}

    def run_print_to_pdf(self, pdf_name: str) -> dict:
        """Salva a OS como PDF. Equivale à rota IPC ``runPrintToPdf``."""
        target = self._service_order_window or self._main
        if target is None:
            return {"saved": False, "reason": "no_window"}
        folders = target.create_file_dialog(webview.FileDialog.FOLDER)
        if not folders:
            return {"saved": False, "reason": "cancelled"}

        filename = pdf_name if pdf_name.lower().endswith(".pdf") else f"{pdf_name}.pdf"
        path = os.path.join(folders[0], filename)
        try:
            print_pdf(target, path)
        except Exception as exc:
            target.create_confirmation_dialog("Erro!", f"Ocorreu um erro: {exc}")
            return {"saved": False, "reason": str(exc)}

        target.create_confirmation_dialog("Sucesso!!", "A Ordem de Serviço foi Salva!!")
        return {"saved": True, "path": path}


if __name__ == "__main__":

    NODE_ENV = os.getenv("NODE_ENV", "development")

    url = "view/index.html"
    if NODE_ENV == "development":
        url = "http://localhost:3000/"

    api = Api()

    window = webview.create_window(
        "Meu App",
        url,
        width=1280,
        height=720,
        js_api=api,
    )

    api._bind(window)

    server_thread = threading.Thread(target=start, name="flask-server", daemon=True)
    server_thread.start()

    webview.start(debug=NODE_ENV == "development")
