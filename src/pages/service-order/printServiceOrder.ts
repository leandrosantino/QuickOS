const API_URL = "http://localhost:3333"

/**
 * Abre a janela de impressão da OS.
 * Usa a ponte do pywebview quando disponível e cai para o template
 * renderizado pelo backend (`/createServiceorder/:id`) no navegador.
 */
export function printServiceOrder(id: number) {
  const bridge = window.pywebview?.api

  if (bridge?.print_service_order) {
    void bridge.print_service_order({ id })
    return
  }

  window.open(`${API_URL}/createServiceorder/${id}`, "_blank")
}
