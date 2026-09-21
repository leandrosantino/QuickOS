import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function BackToCalendarButton() {
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-fit"
      onClick={() => navigate("..", { relative: "path" })}
    >
      <ArrowLeftIcon data-icon="inline-start" />
      Voltar para o calendário
    </Button>
  )
}
