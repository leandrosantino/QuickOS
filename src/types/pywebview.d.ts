type PywebviewApi = {
  print_service_order?: (args: { id: number }) => void | Promise<unknown>
}

interface Window {
  pywebview?: {
    api?: PywebviewApi
  }
}
