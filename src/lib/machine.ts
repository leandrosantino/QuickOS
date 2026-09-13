import { api } from '../utils/trpc'

export function useMachines() {
  return api.main.getMachines.useQuery().data
}
