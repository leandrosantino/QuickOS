import { api } from '../utils/trpc'

export function useWorkerByRegistration(registration: number) {
  const query = api.main.getWorkersByRegistration.useQuery(registration)
  return {
    worker: query.data,
    isLoading: query.isLoading,
    refetch: async () => (await query.refetch()).data,
  }
}
