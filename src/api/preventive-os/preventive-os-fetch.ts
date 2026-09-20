import { del, get, post, put } from '../client';
import {
  type ExecutePreventiveServiceOrderType,
  type GetServiceOrdersParams,
  type ServiceOrderCount,
  type ServiceOrderType,
  type WeekCalendarData,
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

export async function getWeekCalendar(
  year: number,
): Promise<WeekCalendarData[] | null> {
  return get<WeekCalendarData[]>(`/preventive/service-orders/calendar?year=${year}`)
}
