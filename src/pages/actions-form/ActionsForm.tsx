import { ArrowLeftIcon, SaveIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import { useMachines } from "@/api/machine/machine-query"
import { useNatures } from "@/api/nature/nature-query"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { useActionsForm } from "./use-actions-form"

export function ActionsForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const actionId = id != null ? Number(id) : undefined
  const machines = useMachines()
  const natures = useNatures()

  const { action, values, errors, isLoading, isSaving, setField, handleSubmit } =
    useActionsForm(actionId)

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Carregando ação preventiva...
      </div>
    )
  }

  if (actionId != null && !action) {
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
          Ação preventiva não encontrada.
        </p>
      </div>
    )
  }

  const machineItems = (machines ?? []).map((machine) => ({
    label: machine.tag,
    value: String(machine.id),
  }))

  const natureItems = (natures ?? []).map((nature) => ({
    label: nature.name,
    value: String(nature.id),
  }))

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
          <h1 className="font-heading text-2xl font-semibold">
            Ação Preventiva
          </h1>
          <div className="flex gap-2 text-2xl font-semibold tabular-nums">
            {action?.id != null ? `Nº ${action.id}` : ""}
          </div>
        </header>

        <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            {/* Linha 1: Tag, Tipo, Periodicidade e Próxima execução */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field data-invalid={Boolean(errors.machineId)}>
                <FieldLabel htmlFor="action-machine">Tag</FieldLabel>
                <Select
                  items={machineItems}
                  value={values.machineId}
                  onValueChange={(value) => setField("machineId", String(value))}
                >
                  <SelectTrigger
                    id="action-machine"
                    className="w-full"
                    aria-label="Tag da máquina"
                    aria-invalid={Boolean(errors.machineId)}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {machineItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError
                  errors={
                    errors.machineId ? [{ message: errors.machineId }] : undefined
                  }
                />
              </Field>

              <Field data-invalid={Boolean(errors.natureId)}>
                <FieldLabel htmlFor="action-nature">Tipo</FieldLabel>
                <Select
                  items={natureItems}
                  value={values.natureId}
                  onValueChange={(value) => setField("natureId", String(value))}
                >
                  <SelectTrigger
                    id="action-nature"
                    className="w-full"
                    aria-label="Tipo da ação"
                    aria-invalid={Boolean(errors.natureId)}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {natureItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError
                  errors={
                    errors.natureId ? [{ message: errors.natureId }] : undefined
                  }
                />
              </Field>

              <Field data-invalid={Boolean(errors.frequency)}>
                <FieldLabel htmlFor="action-frequency">
                  Periodicidade (semanas)
                </FieldLabel>
                <Input
                  id="action-frequency"
                  type="number"
                  value={values.frequency}
                  onChange={(event) => setField("frequency", event.target.value)}
                  aria-invalid={Boolean(errors.frequency)}
                />
                <FieldError
                  errors={
                    errors.frequency ? [{ message: errors.frequency }] : undefined
                  }
                />
              </Field>

              <Field data-invalid={Boolean(errors.nextExecution)}>
                <FieldLabel htmlFor="action-next-execution">
                  Próxima execução
                </FieldLabel>
                <Input
                  id="action-next-execution"
                  type="week"
                  value={values.nextExecution}
                  onChange={(event) =>
                    setField("nextExecution", event.target.value)
                  }
                  aria-invalid={Boolean(errors.nextExecution)}
                />
                <FieldError
                  errors={
                    errors.nextExecution
                      ? [{ message: errors.nextExecution }]
                      : undefined
                  }
                />
              </Field>
            </div>

            {/* Linha 2: Descrição */}
            <Field data-invalid={Boolean(errors.description)}>
              <FieldLabel htmlFor="action-description">Descrição</FieldLabel>
              <Input
                id="action-description"
                value={values.description}
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                aria-invalid={Boolean(errors.description)}
              />
              <FieldError
                errors={
                  errors.description
                    ? [{ message: errors.description }]
                    : undefined
                }
              />
            </Field>

            {/* Linha 3: Execução */}
            <Field data-invalid={Boolean(errors.excution)}>
              <FieldLabel htmlFor="action-excution">Execução</FieldLabel>
              <Input
                id="action-excution"
                value={values.excution}
                onChange={(event) => setField("excution", event.target.value)}
                aria-invalid={Boolean(errors.excution)}
              />
              <FieldError
                errors={
                  errors.excution ? [{ message: errors.excution }] : undefined
                }
              />
            </Field>

            {/* Linha 4: Desativar + botão Salvar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="action-ignore"
                  checked={values.ignore}
                  onCheckedChange={(checked) => setField("ignore", checked)}
                />
                <label
                  htmlFor="action-ignore"
                  className="cursor-pointer text-sm text-muted-foreground select-none"
                >
                  Desativar
                </label>
              </div>
              <Button type="submit" disabled={isSaving}>
                <SaveIcon data-icon="inline-start" />
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
