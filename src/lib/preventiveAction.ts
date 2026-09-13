import {
  createAction,
  deleteAction,
  getActions,
  updateAction,
  useCreateActionMutation,
  useDeleteActionMutation,
  useUpdateActionMutation,
} from '../api'
import { ActionsInfoType } from '../utils/schemas'

export type GetActionsParams = {
  searchText: string
  weekCode: string
  machineId: number
  natureId: number
  showIgnore: boolean
  limit?: number
  cursor?: number
}

export { getActions }

export function useCreateAction() {
  const { mutateAsync } = useCreateActionMutation()
  return (actionInfo: ActionsInfoType) => mutateAsync(actionInfo)
}

export function useUpdateAction() {
  const { mutateAsync } = useUpdateActionMutation()
  return (input: { id: number; data: ActionsInfoType }) =>
    mutateAsync({ id: input.id, data: input.data as Parameters<typeof updateAction>[0]['data'] })
}

export function useDeleteAction() {
  const { mutateAsync } = useDeleteActionMutation()
  return (input: { id: number }) => mutateAsync(input.id)
}
