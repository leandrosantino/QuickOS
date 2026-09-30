import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import {
  useActionByIdQuery,
  useCreateAction,
  useUpdateAction,
} from "@/api/preventive-action/preventive-action-query"
import {
  savePreventiveActionSchema,
  type ActionsInfoTypeWithActonsTaken,
} from "@/api/preventive-action/preventive-action-types"
import { toast } from "@/components/ui/toast"
import { useConfirm } from "@/hooks/use-confirm"

export type ActionFormValues = {
  machineId: string
  natureId: string
  frequency: string
  nextExecution: string
  description: string
  excution: string
  ignore: boolean
}

export type ActionFormErrors = Partial<Record<keyof ActionFormValues, string>>

const DEFAULT_VALUES: ActionFormValues = {
  machineId: "",
  natureId: "",
  frequency: "",
  nextExecution: "",
  description: "",
  excution: "",
  ignore: false,
}

function toFormValues(action: ActionsInfoTypeWithActonsTaken): ActionFormValues {
  return {
    machineId: String(action.machineId),
    natureId: String(action.natureId),
    frequency: String(action.frequency),
    nextExecution: action.nextExecution,
    description: action.description,
    excution: action.excution,
    ignore: action.ignore,
  }
}

export function useActionsForm(actionId: number | undefined) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const createAction = useCreateAction()
  const updateAction = useUpdateAction()

  const actionQuery = useActionByIdQuery(
    Number.isFinite(actionId) ? (actionId as number) : -1,
  )
  const action = actionQuery.data ?? undefined

  const [values, setValues] = useState<ActionFormValues>(DEFAULT_VALUES)
  const [errors, setErrors] = useState<ActionFormErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const initializedId = useRef<number | null>(null)

  useEffect(() => {
    const currentId = action?.id
    if (action == null || currentId == null || initializedId.current === currentId) {
      return
    }

    initializedId.current = currentId
    setValues(toFormValues(action))
  }, [action])

  function setField<K extends keyof ActionFormValues>(
    key: K,
    value: ActionFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = savePreventiveActionSchema.safeParse(values)

    if (!parsed.success) {
      const nextErrors: ActionFormErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path.length > 0 ? String(issue.path[0]) : "form"
        if (!nextErrors[key as keyof ActionFormValues]) {
          nextErrors[key as keyof ActionFormValues] = issue.message
        }
      }
      setErrors(nextErrors)
      return
    }

    setErrors({})

    const data = parsed.data

    const confirmed = await confirm({
      title: actionId != null ? "Confirmar salvamento" : "Confirmar criação",
      description:
        actionId != null
          ? "Deseja salvar as modificações nesta ação preventiva?"
          : "Deseja criar esta ação preventiva?",
      confirmLabel: "Salvar",
      cancelLabel: "Cancelar",
    })
    if (!confirmed) return

    setIsSaving(true)

    try {
      if (actionId != null) {
        await updateAction({ id: actionId, data })
      } else {
        await createAction(data)
      }

      await queryClient.invalidateQueries({ queryKey: ["api", "actions"] })
      toast.add({
        type: "success",
        title: actionId != null ? "Ação preventiva salva." : "Ação preventiva criada.",
        description: "Operação realizada com sucesso.",
      })
      navigate(-1)
    } catch (error) {
      toast.add({
        type: "error",
        title: "Não foi possível concluir a operação.",
        description:
          error instanceof Error
            ? error.message
            : "Tente novamente em instantes.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return {
    action,
    values,
    errors,
    isLoading: actionId != null ? actionQuery.isLoading : false,
    isSaving,
    setField,
    handleSubmit,
  }
}
