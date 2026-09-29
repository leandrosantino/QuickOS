import { RotateCcwIcon, SearchIcon } from "lucide-react"

import { useMachines } from "@/api/machine/machine-query"
import { useNatures } from "@/api/nature/nature-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import type { ActionFilterKey, ActionFilters } from "./action-filters"

type ActionsFiltersProps = {
  filters: ActionFilters
  onFilterChange: (key: ActionFilterKey, value: ActionFilters[ActionFilterKey]) => void
  onReset: () => void
}

export function ActionsFilters({ filters, onFilterChange, onReset }: ActionsFiltersProps) {
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
      <Input
        type="week"
        value={filters.weekCode}
        onChange={(event) => onFilterChange("weekCode", event.target.value)}
        className="w-44"
        aria-label="Filtrar por próxima execução"
      />

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

      <InputGroup className="w-56">
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          value={filters.searchText}
          onChange={(event) => onFilterChange("searchText", event.target.value)}
          placeholder="Pesquisar descrição..."
          aria-label="Pesquisar descrição"
        />
      </InputGroup>

      <div className="flex items-center gap-2">
        <Switch
          id="show-ignore"
          size="sm"
          checked={filters.showIgnore}
          onCheckedChange={(checked) => onFilterChange("showIgnore", checked)}
        />
        <label
          htmlFor="show-ignore"
          className="cursor-pointer text-sm text-muted-foreground select-none"
        >
          Mostrar desativados
        </label>
      </div>

      <Button variant="destructive" size="sm" onClick={onReset}>
        <RotateCcwIcon data-icon="inline-start" />
        Limpar
      </Button>
    </div>
  )
}
