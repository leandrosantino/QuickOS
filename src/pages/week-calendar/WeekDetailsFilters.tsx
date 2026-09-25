import { RotateCcwIcon } from "lucide-react"

import { useMachines } from "@/api/machine/machine-query"
import { useNatures } from "@/api/nature/nature-query"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type ServiceOrderFilters = {
  status: string
  nature: number
  machine: number
}

export type ServiceOrderFilterKey = keyof ServiceOrderFilters

export const DEFAULT_SERVICE_ORDER_FILTERS: ServiceOrderFilters = {
  status: "all",
  nature: -1,
  machine: -1,
}

const STATUS_ITEMS = [
  { label: "Todos os status", value: "all" },
  { label: "Realizado", value: "true" },
  { label: "Pendente", value: "false" },
]

type WeekDetailsFiltersProps = {
  filters: ServiceOrderFilters
  onFilterChange: (key: ServiceOrderFilterKey, value: ServiceOrderFilters[ServiceOrderFilterKey]) => void
  onReset: () => void
}

export function WeekDetailsFilters({ filters, onFilterChange, onReset }: WeekDetailsFiltersProps) {
  const machines = useMachines()
  const natures = useNatures()

  const machineItems = [
    { label: "Todas as máquinas", value: "-1" },
    ...(machines?.map((machine) => ({ label: machine.tag, value: String(machine.id) })) ?? []),
  ]

  const natureItems = [
    { label: "Todos os tipos", value: "-1" },
    ...(natures?.map((nature) => ({ label: nature.name, value: String(nature.id) })) ?? []),
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        items={STATUS_ITEMS}
        value={filters.status}
        onValueChange={(value) => onFilterChange("status", value ?? "all")}
      >
        <SelectTrigger size="sm" className="w-40" aria-label="Filtrar por status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {STATUS_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        items={machineItems}
        value={String(filters.machine)}
        onValueChange={(value) => onFilterChange("machine", Number(value))}
      >
        <SelectTrigger size="sm" className="w-44" aria-label="Filtrar por máquina">
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

      <Select
        items={natureItems}
        value={String(filters.nature)}
        onValueChange={(value) => onFilterChange("nature", Number(value))}
      >
        <SelectTrigger size="sm" className="w-40" aria-label="Filtrar por tipo">
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

      <Button variant="destructive" size="sm" onClick={onReset}>
        <RotateCcwIcon data-icon="inline-start" />
        Limpar
      </Button>
    </div>
  )
}
