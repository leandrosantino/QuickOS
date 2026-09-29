import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type ActionsPaginationProps = {
  page: number
  hasPrev: boolean
  hasNext: boolean
  isFetching: boolean
  onPrev: () => void
  onNext: () => void
}

export function ActionsPagination({
  page,
  hasPrev,
  hasNext,
  isFetching,
  onPrev,
  onNext,
}: ActionsPaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">Página {page}</p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!hasPrev || isFetching}
        >
          <ChevronLeftIcon data-icon="inline-start" />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNext || isFetching}
        >
          Próxima
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}
