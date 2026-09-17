/**
 * Tipagem da ponte do pywebview. Só existe quando a página roda na shell
 * Python, nunca no dev server do React.
 */
declare global {
    interface Window {
        pywebview?: {
            api?: {
                print_service_order(args: { id?: number }): Promise<{ opened: boolean; reason?: string }>
                run_print_to_pdf(pdfName: string): Promise<{ saved: boolean; reason?: string }>
            }
        }
    }
}

export {}
