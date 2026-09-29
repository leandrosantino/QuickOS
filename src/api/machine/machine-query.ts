import { useQuery } from '@tanstack/react-query'
import { getMachines } from './machine-fetch'

export function useMachines() {
  return useQuery({ queryKey: ['api', 'machines'], queryFn: getMachines }).data
}
