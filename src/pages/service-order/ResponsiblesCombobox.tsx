import { useMemo } from "react"

import { useWorkersQuery } from "@/api/worker/worker-query"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox"

export type FormWorker = {
  id: number
  registration: number
  name: string
}

type ResponsiblesComboboxProps = {
  id?: string
  value: FormWorker[]
  onChange: (workers: FormWorker[]) => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export function ResponsiblesCombobox({
  id,
  value,
  onChange,
  disabled,
  ...aria
}: ResponsiblesComboboxProps) {
  const anchor = useComboboxAnchor()
  const workers = useWorkersQuery()

  const items = useMemo<FormWorker[]>(
    () =>
      (workers.data ?? []).map((worker) => ({
        id: worker.id,
        registration: worker.registration,
        name: worker.name,
      })),
    [workers.data],
  )

  return (
    <Combobox<FormWorker, true>
      multiple
      items={items}
      value={value}
      onValueChange={(next) => onChange(next)}
      itemToStringLabel={(worker) => `${worker.registration} ${worker.name}`}
      isItemEqualToValue={(a, b) => a.id === b.id}
      disabled={disabled}
    >
      <ComboboxChips ref={anchor} aria-invalid={aria["aria-invalid"]}>
        {value.map((worker) => (
          <ComboboxChip key={worker.id}>
            {worker.registration} · {worker.name}
          </ComboboxChip>
        ))}
        <ComboboxChipsInput
          id={id}
          disabled={disabled}
          placeholder={
            value.length === 0
              ? "Digite a matrícula do responsável"
              : "Adicionar responsável"
          }
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {(item: FormWorker) => (
            <ComboboxItem key={item.id} value={item}>
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">
                  Matrícula {item.registration}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>Nenhum manutentista encontrado.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
