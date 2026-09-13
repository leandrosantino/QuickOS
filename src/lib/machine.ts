import { useMachinesQuery } from '../api'

export function useMachines() {
  return useMachinesQuery().data
}
