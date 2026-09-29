import { useQuery } from '@tanstack/react-query'
import { getWorkers, getWorkerByRegistration, getWorkerById } from './worker-fetch'

export function useWorkersQuery() {
  return useQuery({ queryKey: ['api', 'workers'], queryFn: getWorkers })
}

export function useWorkerByIdQuery(id: number) {
  return useQuery({
    queryKey: ['api', 'workers', id],
    queryFn: () => getWorkerById(id),
  })
}

export function useWorkerByRegistration(registration: number) {
  const query = useQuery({
    queryKey: ['api', 'workers', 'registration', registration],
    queryFn: () => getWorkerByRegistration(registration),
  })
  return {
    worker: query.data,
    isLoading: query.isLoading,
    refetch: async () => (await query.refetch()).data,
  }
}
