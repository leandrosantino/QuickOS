import {
  getServiceOrderById,
  useExecuteServiceOrdersMutation,
  useServiceOrderCountQuery,
  useServiceOrdersQuery,
  useUpdateServiceOrderMutation,
} from '../api'
import { ExecutePreventiveServiceOrderType } from '../utils/schemas'

export { getServiceOrderById }

export function useUpdateServiceOrder() {
  const { mutateAsync } = useUpdateServiceOrderMutation()
  return (input: { id: number; data: Omit<ExecutePreventiveServiceOrderType, 'id'> }) =>
    mutateAsync(input)
}

export function useExecuteServiceOrders() {
  const { mutateAsync } = useExecuteServiceOrdersMutation()
  return (input: ExecutePreventiveServiceOrderType) => mutateAsync(input)
}

export function useServiceOrders(params: {
  week: number
  year: number
  status: string
  nature: number
  machine: number
}) {
  const query = useServiceOrdersQuery(params)
  return { data: query.data, isLoading: query.isLoading, refetch: query.refetch }
}

export function useCountPreventiveOs(week: number, year: number) {
  const query = useServiceOrderCountQuery(week, year)
  return { data: query.data ?? undefined, refetch: query.refetch }
}
