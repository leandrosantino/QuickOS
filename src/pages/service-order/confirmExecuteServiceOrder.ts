/**
 * Confirma com o usuário, através do diálogo nativo do pywebview (Sim/Não),
 * que a ordem de serviço deve ser executada. Fora do pywebview cai para o
 * `window.confirm` do navegador.
 */
export async function confirmExecuteServiceOrder(
  orderId: number,
): Promise<boolean> {
  const message = `Deseja realmente executar a OS nº ${orderId}?`
  const bridge = window.pywebview?.api

  if (bridge?.confirm_execute_service_order) {
    try {
      return Boolean(
        await bridge.confirm_execute_service_order({
          title: "Confirmar execução",
          message,
        }),
      )
    } catch {
      return false
    }
  }

  return window.confirm(message)
}
