import { z } from 'zod'
import { machineInfoSchema } from '../machine/machine-types'
import { natureInfoSchema } from '../nature/nature-types'

export const actionInfoSchema = z.object({
    id: z.number().optional(),
    machineId: z.number(),
    natureId: z.number(),
    machine: machineInfoSchema.optional(),
    nature: natureInfoSchema.optional(),
    preventiveOSId: z.number().optional().nullable(),
    ignore: z.boolean(),
    frequency: z.number()
        .positive('A a quantidade de semanas não pode ser menor que 1 !!'),

    nextExecution: z.string()
        .regex(/\d{4}-W\d{2}/, 'A semana selecionada é inválida !!'),

    excution: z.string()
        .min(10, 'O campo Execução precisa ter no mínimo 10 caracteres !!'),

    description: z.string()
        .min(10, 'O campo Descrição precisa ter no mínimo 10 caracteres !!'),

})

const actionsInfoSchemaWithActonsTaken = z.object({
    ...actionInfoSchema.shape,
    _count: z.object({ actionsTaken: z.number() }),
})

export type ActionsInfoTypeWithActonsTaken = z.output<typeof actionsInfoSchemaWithActonsTaken>

export type ActionsInfoType = z.output<typeof actionInfoSchema>
export type ActionsInfoTypeInupt = z.input<typeof actionInfoSchema>

export type GetActionsParams = {
  searchText: string
  weekCode: string
  machineId: number
  natureId: number
  showIgnore: boolean
  limit?: number
  cursor?: number
}

export type CreateActionInput = {
  description: string
  machineId: number
  excution: string
  frequency: number
  natureId: number
  nextExecution: string
  preventiveOSId?: number | null
  ignore: boolean
}

export type UpdateActionInput = { id: number; data: CreateActionInput }
