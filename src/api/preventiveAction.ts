import { useMutation, useQuery } from '@tanstack/react-query'
import { del, get, post, put } from './client'
import { ActionsInfoTypeWithActonsTaken } from '../utils/schemas'

export type GetActionsParams = {
  searchText: string
  weekCode: string
  machineId: number
  natureId: number
  showIgnore: boolean
  limit?: number
  cursor?: number
}

export type CreateActionInput = {
  description: string
  machineId: number
  excution: string
  frequency: number
  natureId: number
  nextExecution: string
  preventiveOSId?: number | null
  ignore: boolean
}

export type UpdateActionInput = { id: number; data: CreateActionInput }

export async function getActions(
  params: GetActionsParams,
): Promise<ActionsInfoTypeWithActonsTaken[]> {
  const searchParams = new URLSearchParams()
  searchParams.set('searchText', params.searchText)
  searchParams.set('weekCode', params.weekCode)
  searchParams.set('machineId', String(params.machineId))
  searchParams.set('natureId', String(params.natureId))
  searchParams.set('showIgnore', String(params.showIgnore))
  if (params.limit !== undefined) searchParams.set('limit', String(params.limit))
  if (params.cursor !== undefined) searchParams.set('cursor', String(params.cursor))

  return (
    (await get<ActionsInfoTypeWithActonsTaken[]>(`/preventive/actions?${searchParams.toString()}`)) ??
    []
  )
}

export async function createAction(data: CreateActionInput): Promise<void> {
  await post('/preventive/actions', data)
}

export async function updateAction(input: UpdateActionInput): Promise<void> {
  await put(`/preventive/actions/${input.id}`, { data: input.data })
}

export async function deleteAction(id: number): Promise<void> {
  await del(`/preventive/actions/${id}`)
}

export function useActionsQuery(params: GetActionsParams) {
  return useQuery({ queryKey: ['api', 'actions', params], queryFn: () => getActions(params) })
}

export function useCreateActionMutation() {
  return useMutation(createAction)
}

export function useUpdateActionMutation() {
  return useMutation(updateAction)
}

export function useDeleteActionMutation() {
  return useMutation(deleteAction)
}
