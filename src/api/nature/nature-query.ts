import { useQuery } from '@tanstack/react-query'
import { getNatures } from './nature-fetch'

export function useNatures() {
  return useQuery({ queryKey: ['api', 'natures'], queryFn: getNatures }).data
}
