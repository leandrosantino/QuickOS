import { useQuery } from '@tanstack/react-query'
import { get } from './client'
import { NatureInfoType } from '../utils/schemas'

export async function getNatures(): Promise<NatureInfoType[]> {
  return (await get<NatureInfoType[]>('/main/natures')) ?? []
}

export function useNaturesQuery() {
  return useQuery({ queryKey: ['api', 'natures'], queryFn: getNatures })
}
