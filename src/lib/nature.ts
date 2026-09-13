import { useNaturesQuery } from '../api'

export function useNatures() {
  return useNaturesQuery().data
}
