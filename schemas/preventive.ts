import { z } from "zod";
import { weekYearRegex } from '../server/utils/weekTools'
import {machineSchema, natureSchema, workerSchema} from './main'

export const actionCreateSchema = z.object({
    description: z.string(),
    machineId: z.number(),
    excution: z.string(),
    frequency: z.number(),
    natureId: z.number(),
    nextExecution: z.string().regex(weekYearRegex),
    preventiveOSId: z.number().nullable().optional(),
    ignore: z.boolean()
})

export const actionsSchema = z.object({
    id: z.number(),
    machine: machineSchema.optional(),
    nature: natureSchema.optional(),
    _count: z.object({ actionsTaken: z.number() }).optional(),
    ...actionCreateSchema.shape
})

export const actionsTakenSchema = z.object({
    id: z.number(),
    date: z.date().or(z.string()),
    osId: z.number(),
    actionId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    action: actionsSchema
})

export const serviceOrdersSchema = z.object({
    id: z.number().optional(),
    concluded: z.boolean().nullable().optional(),
    date: z.date().nullable().optional().or(z.string()),
    machineId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    natureId: z.number(),
    responsible: z.array(workerSchema).optional(),
    actions: z.array(actionsSchema).optional(),
    actionsUniqueKey: z.string(),
    machine: machineSchema.optional(),
    nature: natureSchema.optional(),
    duration: z.number().optional().nullable(),
    actionsTaken: z.array(actionsTakenSchema).optional(),
    startTime: z.date().nullable().optional().or(z.string()),
    finishTime: z.date().nullable().optional().or(z.string()),
})

export type ServiceOrdersType = z.infer<typeof serviceOrdersSchema>

export const assembleServiceOrdersParamsSchema = z.object({
    week: z.number(),
    year: z.number(),
    status: z.string(),
    nature: z.number(),
    machine: z.number(),
})

export type AssembleServiceOrdersParamsType = z.infer<typeof assembleServiceOrdersParamsSchema>

export const executeServiceOrdersParamsSchema = z.object({
    id: z.number(),
    date: z.string(),
    workers: z.array(z.object({ id: z.number() })),
    startTime: z.string(),
    finishTime: z.string(),
})

export type ExecuteServiceOrdersType = z.input<typeof executeServiceOrdersParamsSchema>

export const generateActionsUniqueKeyParmsSchema = z.object({
    id: z.number().optional(),
    machineId: z.number(),
    natureId: z.number(),
})

export type GenerateActionsUniqueKeyParms = z.infer<typeof generateActionsUniqueKeyParmsSchema>[]