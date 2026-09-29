import webview

class MainWindowController:

    def __init__(self, API_URL) -> None:
        self._main: webview.Window | None = None
        self._service_order_window: webview.Window | None = None
        self.API_URL: webview.Window | None = API_URL

    def _bind(self, main_window: webview.Window) -> None:

        self._main = main_window

    def print_service_order(self, args: dict) -> dict:

        order_id = (args or {}).get("id")
        if order_id is None:
            return {"opened": False, "reason": "missing_id"}

        existing = self._service_order_window
        if existing is not None and any(w.uid == existing.uid for w in webview.windows):
            try:
                existing.restore()
                existing.show()
            except Exception:
                pass
            return {"opened": False, "reason": "already_open"}
        
        self._service_order_window = webview.create_window(
            "Ordem de Serviço Preventiva",
            f"{self.API_URL}/createServiceorder/{order_id}",
            width=1350,
            height=900,
            resizable=True
        )
        
        assert self._service_order_window

        
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

