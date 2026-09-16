import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteServiceOrder,
  executeServiceOrders,
  getServiceOrderById,
  getServiceOrderCount,
  getServiceOrders,
  updateServiceOrder,
} from './preventive-os-fetch'
import {
  ExecutePreventiveServiceOrderType,
  GetServiceOrdersParams,
} from './preventive-os-types'

export function useServiceOrders(params: GetServiceOrdersParams) {
  const query = useQuery({
    queryKey: ['api', 'service-orders', params],
    queryFn: () => getServiceOrders(params),
  })
  return { data: query.data, isLoading: query.isLoading, refetch: query.refetch }
}

export function useServiceOrderByIdQuery(id: number) {
  return useQuery({
    queryKey: ['api', 'service-orders', id],
    queryFn: () => getServiceOrderById(id),
  })
}

export function useUpdateServiceOrder() {
  const { mutateAsync } = useMutation(updateServiceOrder)
  return (input: { id: number; data: Omit<ExecutePreventiveServiceOrderType, 'id'> }) =>
    mutateAsync(input)
}

export function useDeleteServiceOrderMutation() {
  return useMutation(deleteServiceOrder)
}

export function useExecuteServiceOrders() {
  const { mutateAsync } = useMutation(executeServiceOrders)
  return (input: ExecutePreventiveServiceOrderType) => mutateAsync(input)
}

export function useCountPreventiveOs(week: number, year: number) {
  const query = useQuery({
    queryKey: ['api', 'service-orders', 'count', week, year],
    queryFn: () => getServiceOrderCount(week, year),
  })
  return { data: query.data ?? undefined, refetch: query.refetch }
}
