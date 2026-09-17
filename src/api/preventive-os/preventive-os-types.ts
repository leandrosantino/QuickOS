import { z } from 'zod'
import { differenceInMinutes } from 'date-fns'
import { weekYearRegex } from '../../utils/weekTools'
import { machineInfoSchema } from '../machine/machine-types'
import { natureInfoSchema } from '../nature/nature-types'
import { workerSchema } from '../worker/worker-types'
import { actionInfoSchema } from '../preventive-action/preventive-action-types'

export const actionsTakenSchema = z.object({
    id: z.number(),
    date: z.string(),
    osId: z.number(),
    actionId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    action: actionInfoSchema
})

export const serviceOrdersSchema = z.object({
    id: z.number().optional(),
    concluded: z.boolean().nullable().optional(),
    date: z.string().nullable().optional(),
    machineId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    responsible: z.array(workerSchema).optional(),
    natureId: z.number(),
    actions: z.array(actionInfoSchema).optional(),
    actionsUniqueKey: z.string(),
    machine: machineInfoSchema.optional(),
    nature: natureInfoSchema.optional(),
    duration: z.number().optional().nullable(),
    actionsTaken: z.array(actionsTakenSchema).optional(),
    startTime: z.date().nullable().optional().or(z.string()),
    finishTime: z.date().nullable().optional().or(z.string()),
})

export type ServiceOrderType = z.infer<typeof serviceOrdersSchema>

const savePreventiveServiceOrderSchema = z.object({
    id: z.number(),
    date: z.date({ invalid_type_error: 'A data informada é inválida !!' })
        .transform(value => value.toISOString()),

    startTime: z.date({ invalid_type_error: 'Informe a Hora de Início!!' })
        .transform(value => value.toISOString()),

    finishTime: z.date({ invalid_type_error: 'Informe a Hora Final!!' })
        .transform(value => value.toISOString()),

    workers: z.array(z.object({ id: z.number() }))
        .refine(workers => workers.length >= 1, 'Informe no mínimo 1 Manutencista!')
})

export const updatePreventiveServiceOrderSchema = savePreventiveServiceOrderSchema.omit({ id: true })

export const executePreventiveServiceOrderSchema = savePreventiveServiceOrderSchema
    .refine(data => differenceInMinutes(new Date(data.finishTime), new Date(data.startTime)) >= 1,
        { message: 'A hora de final precisa ser maior que a hora de início!' })

export type ExecutePreventiveServiceOrderType = z.infer<typeof executePreventiveServiceOrderSchema>

export type GetServiceOrdersParams = {
  week: number
  year: number
  status: string
  nature: number
  machine: number
}

export type ServiceOrderCount = { finished: number; unfinished: number }
