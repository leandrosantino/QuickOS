import { cn } from "cn"
import { ArrowLeftIcon, PlayIcon, PrinterIcon, SaveIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import { useServiceOrderByIdQuery } from "@/api/preventive-os/preventive-os-query"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { EditableDatePicker } from "./EditableDatePicker"
import { ResponsiblesCombobox } from "./ResponsiblesCombobox"
import { ServiceOrderActionsTable } from "./ServiceOrderActionsTable"
import { formatDuration, useServiceOrderForm } from "./use-service-order-form"

export function ServiceOrderForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const orderId = Number(id)
  const serviceOrder = useServiceOrderByIdQuery(
    Number.isFinite(orderId) ? orderId : -1,
  )
  const order = serviceOrder.data ?? undefined

  const {
    values,
    errors,
    durationMinutes,
    isSaving,
    setField,
    handleSubmit,
    handlePrint,
  } = useServiceOrderForm(order)

  if (serviceOrder.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Carregando ordem de serviço...
      </div>
    )
  }

  if (!order || order.id == null || values == null) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Voltar
        </Button>
        <p className="text-sm text-muted-foreground">
          Ordem de serviço não encontrada.
        </p>
      </div>
    )
  }

  const concluded = Boolean(order.concluded)
  const actionsCount = concluded
    ? (order.actionsTaken?.length ?? 0)
    : (order.actions?.length ?? 0)

  return (
    <div className="flex min-h-full flex-col p-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Voltar
      </Button>

      <div className="mx-auto flex w-full max-w-255 flex-1 flex-col gap-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl font-semibold">
              Ordem de Serviço Preventiva
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span>{order.machine?.tag ?? "Máquina não informada"}</span>
              <Separator orientation="vertical" />
              <span>{order.nature?.name ?? "Tipo não informado"}</span>
              <Separator orientation="vertical" />
              <span>{order.weekCode}</span>
              <Separator orientation="vertical" />
              <Badge
                className={cn(
                  "border-transparent",
                  concluded
                    ? "bg-primary/15 text-primary"
                    : "bg-warning/15 text-warning",
                )}
              >
                {concluded ? "Realizado" : "Pendente"}
              </Badge>

            </div>
          </div>
          <div className="flex gap-2 text-2xl font-semibold tabular-nums">
            Nº {order.id}
          </div>
        </header>

        <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            {/* Linha 1: Data, Hora de início e Hora Final */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Field data-invalid={Boolean(errors.date)}>
                <FieldLabel htmlFor="service-order-date">Data</FieldLabel>
                <EditableDatePicker
                  id="service-order-date"
                  value={values.date}
                  onChange={(date) => setField("date", date)}
                  aria-invalid={Boolean(errors.date)}
                />
                <FieldError
                  errors={errors.date ? [{ message: errors.date }] : undefined}
                />
              </Field>

              <Field data-invalid={Boolean(errors.startTime)}>
                <FieldLabel htmlFor="service-order-start">
                  Hora de início
                </FieldLabel>
                <Input
                  id="service-order-start"
                  type="time"
                  value={values.startTime}
                  onChange={(event) =>
                    setField("startTime", event.target.value)
                  }
                  aria-invalid={Boolean(errors.startTime)}
                />
                <FieldError
                  errors={
                    errors.startTime
                      ? [{ message: errors.startTime }]
                      : undefined
                  }
                />
              </Field>

              <Field data-invalid={Boolean(errors.finishTime)}>
                <FieldLabel htmlFor="service-order-finish">
                  Hora Final
                </FieldLabel>
                <Input
                  id="service-order-finish"
                  type="time"
                  value={values.finishTime}
                  onChange={(event) =>
                    setField("finishTime", event.target.value)
                  }
                  aria-invalid={Boolean(errors.finishTime)}
                />
                <FieldError
                  errors={
                    errors.finishTime
                      ? [{ message: errors.finishTime }]
                      : undefined
                  }
                />
              </Field>
            </div>

            {/* Linha 2: Responsáveis */}
            <Field data-invalid={Boolean(errors.workers)}>
              <FieldLabel htmlFor="service-order-workers">
                <span>Responsáveis </span>
                <Separator orientation="vertical" />
                <FieldDescription className="text-xs" >
                  Digite a matrícula do manutentista e selecione para
                  incluí-lo na OS.
                </FieldDescription>
              </FieldLabel>
              <ResponsiblesCombobox
                id="service-order-workers"
                value={values.workers}
                onChange={(workers) => setField("workers", workers)}
                aria-invalid={Boolean(errors.workers)}
              />

              <FieldError
                errors={
                  errors.workers ? [{ message: errors.workers }] : undefined
                }
              />
            </Field>

            {/* Linha 3: Duração + botões Salvar/Executar e Imprimir */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-muted-foreground">
                  Duração
                </span>
                <span className="text-lg font-semibold tabular-nums">
                  {formatDuration(durationMinutes)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <PrinterIcon data-icon="inline-start" />
                  Imprimir OS
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {concluded ? (
                    <SaveIcon data-icon="inline-start" />
                  ) : (
                    <PlayIcon data-icon="inline-start" />
                  )}
                  {isSaving
                    ? "Salvando..."
                    : concluded
                      ? "Salvar"
                      : "Executar"}
                </Button>

              </div>
            </div>
          </FieldGroup>

          <Separator orientation="horizontal" />

          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-heading text-lg font-semibold">Ações Preventivas</h2>
              <span className="text-sm tabular-nums text-muted-foreground">
                {actionsCount} {actionsCount === 1 ? "item" : "itens"}
              </span>
            </div>
            <ServiceOrderActionsTable order={order} />
          </section>
        </form>
      </div>
    </div>
  )
}
