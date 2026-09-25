import { PrinterIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useServiceOrders } from "@/api/preventive-os/preventive-os-query";
import type { ServiceOrderType } from "@/api/preventive-os/preventive-os-types";
import { Button } from "@/components/ui/button";

import { BackToCalendarButton } from "./BackToCalendarButton";
import {
  DEFAULT_SERVICE_ORDER_SORT,
  getServiceOrderSortValue,
  ServiceOrdersTable,
  type ServiceOrderSort,
  type ServiceOrderSortKey,
} from "./ServiceOrdersTable";
import {
  DEFAULT_SERVICE_ORDER_FILTERS,
  WeekDetailsFilters,
  type ServiceOrderFilterKey,
  type ServiceOrderFilters,
} from "./WeekDetailsFilters";

export function WeekDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  // Acessa o objeto enviado via state
  const week = location.state?.week as number
  const year = location.state?.year as number

  const [filters, setFilters] = useState<ServiceOrderFilters>(DEFAULT_SERVICE_ORDER_FILTERS)
  const [sort, setSort] = useState<ServiceOrderSort>(DEFAULT_SERVICE_ORDER_SORT)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const serviceOrders = useServiceOrders({ week, year, ...filters })

  const sortedOrders = useMemo(() => {
    const orders = [...(serviceOrders.data ?? [])]
    const { key, direction } = sort
    const factor = direction === "asc" ? 1 : -1

    orders.sort((a, b) => {
      const aValue = getServiceOrderSortValue(a, key)
      const bValue = getServiceOrderSortValue(b, key)

      // Valores ausentes (ex.: campos de OS pendente) ficam sempre ao final.
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return (Number(aValue) - Number(bValue)) * factor
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * factor
      }
      return String(aValue).localeCompare(String(bValue), "pt-BR") * factor
    })

    return orders
  }, [serviceOrders.data, sort])

  const selectedOrders = useMemo(
    () => sortedOrders.filter((order) => order.id != null && selectedIds.has(order.id)),
    [sortedOrders, selectedIds],
  )

  function handleFilterChange(
    key: ServiceOrderFilterKey,
    value: ServiceOrderFilters[ServiceOrderFilterKey],
  ) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function handleSortChange(key: ServiceOrderSortKey) {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    )
  }

  function handleReset() {
    setFilters(DEFAULT_SERVICE_ORDER_FILTERS)
    setSort(DEFAULT_SERVICE_ORDER_SORT)
  }

  function handleRowClick(order: ServiceOrderType) {
    if (order.id == null) return
    navigate(`service-order/${order.id}`)
  }

  function handlePrintSelected() {
    console.log("OSs selecionadas para impressão", selectedOrders)
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <BackToCalendarButton />
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">
            W{week} - Preventivas Planejadas
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as ordens de serviço preventivas para a semana {week} de {year}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.size > 0 && (
            <Button size="sm" onClick={handlePrintSelected}>
              <PrinterIcon data-icon="inline-start" />
              Imprimir OSs
            </Button>
          )}
          <WeekDetailsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>
      </header>
      <ServiceOrdersTable
        orders={sortedOrders}
        isLoading={serviceOrders.isLoading}
        sort={sort}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        onSortChange={handleSortChange}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
