import { useMutation, useQuery } from '@tanstack/react-query'
import { del, get, post, put } from './client'
import { ExecutePreventiveServiceOrderType, ServiceOrderType } from '../utils/schemas'

export type GetServiceOrdersParams = {
  week: number
  year: number
  status: string
  nature: number
  machine: number
}

export type ServiceOrderCount = { finished: number; unfinished: number }

export async function getServiceOrders(
  params: GetServiceOrdersParams,
): Promise<ServiceOrderType[]> {
  return (await post<ServiceOrderType[]>('/preventive/service-orders', params)) ?? []
}

export async function getServiceOrderById(id: number): Promise<ServiceOrderType | null> {
  return get<ServiceOrderType>(`/preventive/service-orders/${id}`)
}

export async function updateServiceOrder(
  input: { id: number; data: Omit<ExecutePreventiveServiceOrderType, 'id'> },
): Promise<void> {
  await put(`/preventive/service-orders/${input.id}`, { data: input.data })
}

export async function deleteServiceOrder(id: number): Promise<void> {
  await del(`/preventive/service-orders/${id}`)
}

export async function executeServiceOrders(
  input: ExecutePreventiveServiceOrderType,
): Promise<void> {
  await post('/preventive/service-orders/execute', input)
}

export async function getServiceOrderCount(
  week: number,
  year: number,
): Promise<ServiceOrderCount | null> {
  return get<ServiceOrderCount>(`/preventive/service-orders/count?week=${week}&year=${year}`)
}

export function useServiceOrdersQuery(params: GetServiceOrdersParams) {
  return useQuery({
    queryKey: ['api', 'service-orders', params],
    queryFn: () => getServiceOrders(params),
  })
}

export function useServiceOrderByIdQuery(id: number) {
  return useQuery({
    queryKey: ['api', 'service-orders', id],
    queryFn: () => getServiceOrderById(id),
  })
}

export function useUpdateServiceOrderMutation() {
  return useMutation(updateServiceOrder)
}

export function useDeleteServiceOrderMutation() {
  return useMutation(deleteServiceOrder)
}

export function useExecuteServiceOrdersMutation() {
  return useMutation(executeServiceOrders)
}

export function useServiceOrderCountQuery(week: number, year: number) {
  return useQuery({
    queryKey: ['api', 'service-orders', 'count', week, year],
    queryFn: () => getServiceOrderCount(week, year),
  })
}
