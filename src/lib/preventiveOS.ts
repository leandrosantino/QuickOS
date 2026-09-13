import { api, fetch } from '../utils/trpc'
import { ExecutePreventiveServiceOrderType } from '../utils/schemas'

export function getServiceOrderById(id: number) {
  return fetch.preventive.getServiceOrderById.query({ id })
}

export function useUpdateServiceOrder() {
  const { mutateAsync } = api.preventive.updateServiceOrder.useMutation()
  return (input: { id: number; data: Omit<ExecutePreventiveServiceOrderType, 'id'> }) =>
    mutateAsync(input)
}

export function useExecuteServiceOrders() {
  const { mutateAsync } = api.preventive.executeServiceOrders.useMutation()
  return (input: ExecutePreventiveServiceOrderType) => mutateAsync(input)
}

export function useServiceOrders(params: {
  week: number
  year: number
  status: string
  nature: number
  machine: number
}) {
  const query = api.preventive.getServiceOrders.useQuery(params)
  return { data: query.data, isLoading: query.isLoading, refetch: query.refetch }
}

export function useCountPreventiveOs(week: number, year: number) {
  const query = api.preventive.getcountPreventiveOs.useQuery({ week, year })
  return { data: query.data, refetch: query.refetch }
}
