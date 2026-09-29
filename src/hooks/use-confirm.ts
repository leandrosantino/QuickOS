import { createContext, useContext } from "react"

export type ConfirmOptions = {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: "default" | "destructive"
}

export type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>

export const ConfirmContext = createContext<ConfirmFn | null>(null)

export function useConfirm(): ConfirmFn {
  const confirm = useContext(ConfirmContext)

  if (confirm == null) {
    throw new Error("useConfirm deve ser usado dentro de <ConfirmProvider>.")
  }

  return confirm
}
