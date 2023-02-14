import { z } from 'zod'
import {weekYearRegex} from './weekTools'

export const machineInfoSchema = z.object({
    id: z.number(),
    tag: z.string(),
    technology: z.string(),
    ute: z.string()
})

export type MachineInfoType = z.infer<typeof machineInfoSchema>

export const natureInfoSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type NatureInfoType = z.infer<typeof natureInfoSchema>

export const actionInfoSchema = z.object({
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
    responsibleId: z.number().nullable().optional(),
    date: z.string().nullable().optional(),
    machineId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    natureId: z.number(),
    actions: z.array(actionInfoSchema).optional(),
    actionsUniqueKey: z.string(),
    machine: machineInfoSchema.optional(),
    nature: natureInfoSchema.optional(),
    duration: z.number().optional().nullable(),
    actionsTaken: z.array(actionsTakenSchema).optional(),
})

export type ServiceOrderType = z.infer<typeof serviceOrdersSchema>

export { }