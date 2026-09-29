import { useEffect, useState } from "react"
import { format, isValid, parse, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const DATE_FORMAT = "dd/MM/yyyy"

type EditableDatePickerProps = {
  id?: string
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean
}

export function EditableDatePicker({
  id,
  value,
  onChange,
  disabled,
  className,
  ...aria
}: EditableDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState(value ? format(value, DATE_FORMAT) : "")

  useEffect(() => {
    setText(value ? format(value, DATE_FORMAT) : "")
  }, [value])

  function commitText(next: string) {
    const parsed = parse(next, DATE_FORMAT, new Date())
    if (isValid(parsed)) {
      onChange(startOfDay(parsed))
    } else {
      setText(value ? format(value, DATE_FORMAT) : "")
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <InputGroup className={className}>
        <InputGroupInput
          id={id}
          value={text}
          disabled={disabled}
          placeholder="dd/mm/aaaa"
          inputMode="numeric"
          onChange={(event) => setText(event.target.value)}
          onBlur={() => commitText(text)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              commitText(text)
            }
          }}
          {...aria}
        />
        <InputGroupAddon align="inline-end">
          <PopoverTrigger
            render={
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                disabled={disabled}
                aria-label="Abrir calendário"
              />
            }
          >
            <CalendarIcon />
          </PopoverTrigger>
        </InputGroupAddon>
      </InputGroup>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          locale={ptBR}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
