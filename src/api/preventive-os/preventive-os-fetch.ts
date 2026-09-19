import { del, get, post, put } from '../client';
import {
  type ExecutePreventiveServiceOrderType,
  type GetServiceOrdersParams,
  type ServiceOrderCount,
  type ServiceOrderType,
} from './preventive-os-types';

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
