import { useQuery } from '@tanstack/react-query'
import { get } from './client'
import { MachineInfoType } from '../utils/schemas'

export async function getMachines(): Promise<MachineInfoType[]> {
  return (await get<MachineInfoType[]>('/main/machines')) ?? []
}

export function useMachinesQuery() {
  return useQuery({ queryKey: ['api', 'machines'], queryFn: getMachines })
}
