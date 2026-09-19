const BASE_URL = 'http://localhost:3333'

export type SuccessResponse = { message: string; code: number }

export class ApiError extends Error {
  constructor(status: number, message?: string) {
    super(message ?? `Request failed with status ${status}`)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new ApiError(response.status, await response.text())
  }

  const text = await response.text()
  if (!text) {
    return undefined as unknown as T
  }

  return JSON.parse(text) as T
}

export function get<T>(path: string): Promise<T | null> {
  return request<T>(path)
}

export function post<T = SuccessResponse>(path: string, body?: unknown): Promise<T | null> {
  return request<T>(path, {
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

export function put<T = SuccessResponse>(path: string, body?: unknown): Promise<T | null> {
  return request<T>(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function del<T = SuccessResponse>(path: string): Promise<T | null> {
  return request<T>(path, { method: 'DELETE' })
}
