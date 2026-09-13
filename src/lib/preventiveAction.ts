import { api, fetch } from '../utils/trpc'
import { ActionsInfoType } from '../utils/schemas'

type GetActionsParams = {
  searchText: string
  weekCode: string
  machineId: number
  natureId: number
  showIgnore: boolean
  limit?: number
  cursor?: number
}

export function getActions(params: GetActionsParams) {
  return fetch.preventive.getActions.query(params)
}

export function useCreateAction() {
  const { mutateAsync } = api.preventive.createAction.useMutation()
  return (actionInfo: ActionsInfoType) => mutateAsync(actionInfo)
}

export function useUpdateAction() {
  const { mutateAsync } = api.preventive.updateAction.useMutation()
  return (input: { id: number; data: ActionsInfoType }) => mutateAsync(input)
}

export function useDeleteAction() {
  const { mutateAsync } = api.preventive.deleteAction.useMutation()
  return (input: { id: number }) => mutateAsync(input)
}
