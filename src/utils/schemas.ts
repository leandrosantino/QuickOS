import {z} from 'zod'

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
    excution: z.string(),
    preventiveOSId: z.number().optional(),
    frequency: z.string()
        .min(1, 'A a quantidade de semanas não pode ser menor que 1 !!')
        .transform((val) => Number(val)),

    nextExecution: z.string()
        .regex(/\d{4}-W\d{2}/, 'A semana selecionada é inválida !!'),

    description: z.string()
        .min(10, 'A descrição tem que ter no mínimo 10 caracteres !!')
})

export type ActionsInfoType = z.output<typeof actionInfoSchema>
export type ActionsInfoTypeInupt = z.input<typeof actionInfoSchema>


export {}