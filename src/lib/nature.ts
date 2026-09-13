import { api } from '../utils/trpc'

export function useNatures() {
  return api.main.getNatures.useQuery().data
}
