import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createAction,
  deleteAction,
  getActions,
  updateAction,
} from './preventive-action-fetch'
import { ActionsInfoType, GetActionsParams } from './preventive-action-types'

export function useActionsQuery(params: GetActionsParams) {
  return useQuery({ queryKey: ['api', 'actions', params], queryFn: () => getActions(params) })
}

export function useCreateAction() {
  const { mutateAsync } = useMutation(createAction)
  return (actionInfo: ActionsInfoType) => mutateAsync(actionInfo)
}

export function useUpdateAction() {
  const { mutateAsync } = useMutation(updateAction)
  return (input: { id: number; data: ActionsInfoType }) =>
    mutateAsync({ id: input.id, data: input.data as Parameters<typeof updateAction>[0]['data'] })
}

export function useDeleteAction() {
  const { mutateAsync } = useMutation(deleteAction)
  return (input: { id: number }) => mutateAsync(input.id)
}
