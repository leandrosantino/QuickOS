/**
 * Ponte para a API do pywebview (`src-py/main.py`, exposta via `js_api`).
 *
 * Os nomes dos métodos são os nomes Python, sem conversão para camelCase —
 * o pywebview usa o nome do método como chave em `window.pywebview.api`.
 */

interface PywebviewApi {
    print_service_order(args: { id?: number }): Promise<{ opened: boolean; reason?: string }>
    run_print_to_pdf(pdfName: string): Promise<{ saved: boolean; reason?: string }>
}

function getApi(): PywebviewApi | null {
    return (window as any).pywebview?.api ?? null
}

export const ipc = {
    /** Abre a janela de impressão da OS. Fora do pywebview não faz nada. */
    async printServiceOrder(data: { id?: number }): Promise<boolean> {
        const api = getApi()
        if (!api) {
            console.warn('Impressão indisponível fora do pywebview')
            return false
        }
        // Só o id: o backend relê a OS do banco para renderizar o template.
        const result = await api.print_service_order({ id: data.id })
        return result?.opened ?? false
    },
}
