import { del, get, post, put } from '../client'
import {
  ActionsInfoTypeWithActonsTaken,
  CreateActionInput,
  GetActionsParams,
  UpdateActionInput,
} from './preventive-action-types'

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
