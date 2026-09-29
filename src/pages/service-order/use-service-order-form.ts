import { useQueryClient } from "@tanstack/react-query"
import { differenceInMinutes, format, parseISO } from "date-fns"
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import {
  useExecuteServiceOrders,
  useUpdateServiceOrder,
} from "@/api/preventive-os/preventive-os-query"
import {
  executePreventiveServiceOrderSchema,
  type ServiceOrderType,
} from "@/api/preventive-os/preventive-os-types"
import { toast } from "@/components/ui/toast"
import { useConfirm } from "@/hooks/use-confirm"

import { printServiceOrder } from "./printServiceOrder"
import type { FormWorker } from "./ResponsiblesCombobox"

export type FormValues = {
  date: Date | undefined
  startTime: string
  finishTime: string
  workers: FormWorker[]
}

export type FormErrors = Record<string, string>

function toTimeString(value?: string | Date | null): string {
  if (!value) return ""
  const date = typeof value === "string" ? parseISO(value) : value
  return Number.isNaN(date.getTime()) ? "" : format(date, "HH:mm")
}

function combineDateTime(date: Date, time: string): Date | undefined {
  if (!time) return undefined
  const [hours, minutes] = time.split(":").map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return undefined
  const result = new Date(date)
  result.setHours(hours, minutes, 0, 0)
  return result
}

export function formatDuration(minutes: number | null): string {
  if (minutes == null) return "—"
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (hours === 0) return `${remaining} min`
  if (remaining === 0) return `${hours} h`
  return `${hours} h ${remaining} min`
}

export function useServiceOrderForm(order: ServiceOrderType | undefined) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const updateServiceOrder = useUpdateServiceOrder()
  const executeServiceOrders = useExecuteServiceOrders()

  const [values, setValues] = useState<FormValues | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const initializedId = useRef<number | null>(null)

  useEffect(() => {
    const currentId = order?.id
    if (order == null || currentId == null || initializedId.current === currentId) {
      return
    }

    initializedId.current = currentId
    setValues({
      date: order.date ? parseISO(order.date) : new Date(),
      startTime: toTimeString(order.startTime),
      finishTime: toTimeString(order.finishTime),
      workers: (order.responsible ?? []).map((worker) => ({
        id: worker.id,
        registration: worker.registration,
        name: worker.name,
      })),
    })
  }, [order])

  const durationMinutes = useMemo(() => {
    if (!values?.date || !values.startTime || !values.finishTime) return null
    const start = combineDateTime(values.date, values.startTime)
    const finish = combineDateTime(values.date, values.finishTime)
    if (!start || !finish) return null
    const minutes = differenceInMinutes(finish, start)
    return minutes > 0 ? minutes : null
  }, [values])

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => (current ? { ...current, [key]: value } : current))
    setErrors((current) => {
      if (!current[key as string]) return current
      const next = { ...current }
      delete next[key as string]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!order || !values || order.id == null) return

    const start =
      values.date && values.startTime
        ? combineDateTime(values.date, values.startTime)
        : undefined
    const finish =
      values.date && values.finishTime
        ? combineDateTime(values.date, values.finishTime)
        : undefined

    const parsed = executePreventiveServiceOrderSchema.safeParse({
      id: order.id,
      date: values.date,
      startTime: start,
      finishTime: finish,
      workers: values.workers,
    })

    if (!parsed.success) {
      const nextErrors: FormErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path.length > 0 ? String(issue.path[0]) : "form"
        if (!nextErrors[key]) nextErrors[key] = issue.message
      }
      setErrors(nextErrors)
      return
    }

    const confirmed = await confirm({
      title: order.concluded ? "Confirmar salvamento" : "Confirmar execução",
      description: order.concluded
        ? `Deseja salvar as modificações na OS nº ${order.id}?`
        : `Deseja realmente executar a OS nº ${order.id}?`,
      confirmLabel: order.concluded ? "Salvar" : "Executar",
      cancelLabel: "Cancelar",
    })
    if (!confirmed) return

    setErrors({})
    setIsSaving(true)

    try {
      if (order.concluded) {
        const { id: currentId, ...data } = parsed.data
        await updateServiceOrder({ id: currentId, data })
      } else {
        await executeServiceOrders(parsed.data)
      }

      await queryClient.invalidateQueries({ queryKey: ["api", "service-orders"] })
      toast.add({
        type: "success",
        title: order.concluded
          ? "Ordem de serviço salva."
          : "Ordem de serviço executada.",
        description: `OS nº ${order.id} atualizada com sucesso.`,
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

  function handlePrint() {
    if (order?.id == null) return
    printServiceOrder(order.id)
  }

  return {
    values,
    errors,
    durationMinutes,
    isSaving,
    setField,
    handleSubmit,
    handlePrint,
  }
}
