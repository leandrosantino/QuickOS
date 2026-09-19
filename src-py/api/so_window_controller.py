import webview
from infra.printing import print_pdf
import os

API_URL = "http://localhost:3333"

class SoWindowController:
    """Ponte exposta ao JS via ``window.pywebview.api``.

    Os nomes dos métodos são usados literalmente como chave no JS — o pywebview
    não converte snake_case para camelCase (``webview/util.py``).
    """

    def __init__(self) -> None:
        self._service_order_window: webview.Window | None = None

    def _bind(self, service_order_window: webview.Window) -> None:

        self._service_order_window = service_order_window
        
    def run_print_to_pdf(self, pdf_name: str):
        """Salva a OS como PDF. Equivale à rota IPC ``runPrintToPdf``."""
        target = self._service_order_window
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