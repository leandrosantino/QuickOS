import { get } from '../client'
import { type MachineInfoType } from './machine-types'

export async function getMachines(): Promise<MachineInfoType[]> {
  return (await get<MachineInfoType[]>('/main/machines')) ?? []
}
