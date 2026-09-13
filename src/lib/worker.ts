import { useWorkerByRegistrationQuery } from '../api'

export function useWorkerByRegistration(registration: number) {
  const query = useWorkerByRegistrationQuery(registration)
  return {
    worker: query.data,
    isLoading: query.isLoading,
    refetch: async () => (await query.refetch()).data,
  }
}
