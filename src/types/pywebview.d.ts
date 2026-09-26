type PywebviewApi = {
  print_service_order?: (args: { id: number }) => void | Promise<unknown>
  confirm_execute_service_order?: (args: {
    title?: string
    message?: string
  }) => boolean | Promise<boolean>
}

interface Window {
  pywebview?: {
    api?: PywebviewApi
  }
}
