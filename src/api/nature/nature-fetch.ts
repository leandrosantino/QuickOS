import { get } from '../client'
import { type NatureInfoType } from './nature-types'

export async function getNatures(): Promise<NatureInfoType[]> {
  return (await get<NatureInfoType[]>('/main/natures')) ?? []
}
