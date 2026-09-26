import webview

API_URL = "http://localhost:3333"
from api.so_window_controller import SoWindowController

class MainWindowController:
    """Ponte exposta ao JS via ``window.pywebview.api``.

    Os nomes dos métodos são usados literalmente como chave no JS — o pywebview
    não converte snake_case para camelCase (``webview/util.py``).
    """

    def __init__(self) -> None:
        self._main: webview.Window | None = None
        self._service_order_window: webview.Window | None = None

    def _bind(self, main_window: webview.Window) -> None:

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
        
        api = SoWindowController()

        self._service_order_window = webview.create_window(
            "Ordem de Serviço Preventiva",
            f"{API_URL}/createServiceorder/{order_id}",
            width=900,
            height=700,
            resizable=True,
            js_api=api
        )
        
        assert self._service_order_window
        api._bind(self._service_order_window)
        
        return {"opened": True}

    def confirm_execute_service_order(self, args: dict) -> bool:
        """Exibe o diálogo nativo de confirmação antes de executar a OS."""
        if self._main is None:
            return False

        title = (args or {}).get("title") or "Confirmar execução"
        message = (args or {}).get("message") or (
            "Deseja realmente executar esta ordem de serviço?"
        )

        return bool(self._main.create_confirmation_dialog(title, message))

