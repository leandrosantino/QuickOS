import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useActionsQuery } from "@/api/preventive-action/preventive-action-query"
import { Button } from "@/components/ui/button"
import { useDebouncedValue } from "@/hooks/use-debounced-value"

import { ActionsFilters } from "./ActionsFilters"
import { ActionsPagination } from "./ActionsPagination"
import { ActionsTable } from "./ActionsTable"
import {
  DEFAULT_ACTION_FILTERS,
  type ActionFilterKey,
  type ActionFilters,
} from "./action-filters"

const PAGE_SIZE = 100

export function Actions() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<ActionFilters>(DEFAULT_ACTION_FILTERS)
  const [cursors, setCursors] = useState<number[]>([1])

  const debouncedSearchText = useDebouncedValue(filters.searchText)

  const actionsQuery = useActionsQuery({
    searchText: debouncedSearchText,
    weekCode: filters.weekCode,
    machineId: filters.machine,
    natureId: filters.nature,
    showIgnore: filters.showIgnore,
    limit: PAGE_SIZE + 1,
    cursor: cursors[cursors.length - 1] ?? 1,
  })

  const data = actionsQuery.data ?? []
  const visibleActions = data.slice(0, PAGE_SIZE)
  const hasNext = data.length > PAGE_SIZE
  const page = cursors.length

  function resetPagination() {
    setCursors((current) => (current.length === 1 ? current : [1]))
  }

  function handleFilterChange(
    key: ActionFilterKey,
    value: ActionFilters[ActionFilterKey],
  ) {
    setFilters((current) => ({ ...current, [key]: value }))
    resetPagination()
  }

  function handleReset() {
    setFilters(DEFAULT_ACTION_FILTERS)
    resetPagination()
  }

  function handlePrev() {
    setCursors((current) => current.slice(0, -1))
  }

  function handleNext() {
    const lastAction = visibleActions[visibleActions.length - 1]
    const lastId = lastAction?.id
    if (lastId == null) return
    setCursors((current) => [...current, lastId])
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">Ações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as ações preventivas das máquinas.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={() => navigate("/acoes/form")}>
            <PlusIcon data-icon="inline-start" />
            Nova ação
          </Button>
          <ActionsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>
      </header>
      <ActionsTable
        actions={visibleActions}
        isLoading={actionsQuery.isLoading}
        onRowClick={(action) => navigate(`/acoes/form/${action.id}`)}
      />
      <ActionsPagination
        page={page}
        hasPrev={page > 1}
        hasNext={hasNext}
        isFetching={actionsQuery.isFetching}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}
