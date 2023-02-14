import { z } from "zod";
import prisma from "../services/prisma"
import {
    incrementWeekYear,
    weekYearStringToNumber,
    weekYearToString,
    weekYearRegex
} from "../utils/weekTools"

export const machineSchema = z.object({
    id: z.number(),
    tag: z.string(),
    technology: z.string(),
    ute: z.string()
})

export const natureSchema = z.object({
    id: z.number(),
    name: z.string()
})

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
    date: z.date(),
    osId: z.number(),
    actionId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    action: actionsSchema
})

export const serviceOrdersSchema = z.object({
    id: z.number().optional(),
    concluded: z.boolean().nullable().optional(),
    responsibleId: z.number().nullable().optional(),
    date: z.date().nullable().optional(),
    machineId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    natureId: z.number(),
    actions: z.array(actionsSchema).optional(),
    actionsUniqueKey: z.string(),
    machine: machineSchema.optional(),
    nature: natureSchema.optional(),
    duration: z.number().optional().nullable(),
    actionsTaken: z.array(actionsTakenSchema).optional(),
})

export type ServiceOrdersType = z.infer<typeof serviceOrdersSchema>

export async function assembleServiceOrders(week: number, year: number) {
    try {
        const OSs: ServiceOrdersType[] = []

        const machines = await prisma.machine.findMany()
        const natures = await prisma.nature.findMany()
        const weekCode = weekYearToString(week, year)

        for await (let mac of machines) {
            for await (let nat of natures) {
                const actions = await prisma.preventiveAction.findMany({
                    where: {
                        nextExecution: weekCode,
                        machineId: mac.id,
                        natureId: nat.id,
                        ignore: false,
                    },
                    include: {
                        machine: true, nature: true, actionsTaken: true
                    }
                })

                
                const actionsUniqueKey = generateActionsUniqueKey(actions)

                if (actions.length > 0) {
                    const os = {
                        weekCode,
                        machineId: mac.id,
                        natureId: nat.id,
                        actions,
                        actionsUniqueKey,
                    }
                    OSs.push(await registerServiceOrders(os))
                }

                const os = await prisma.preventiveOS.findMany({
                    where: {
                        weekCode,
                        machineId: mac.id,
                        natureId: nat.id,
                        concluded: true,
                    },
                    include: {
                        nature: true,
                        machine: true,
                        actionsTaken: {
                            include:{
                                action: {
                                    include: {
                                        nature: true, machine: true
                                    }
                                },
                            }
                        }
                    }
                })

                OSs.push(...os)
            }
        }
        
        return OSs

    } catch (error) {
        throw error
    }

}

export async function registerServiceOrders({ machineId, weekCode, actions, natureId, actionsUniqueKey }: ServiceOrdersType) {
    try {

        const osData = {
            machineId,
            weekCode,
            natureId,
            actionsUniqueKey,
            actions: {
                connect: actions?.map(({ id }) => ({ id }))
            }
        }

        const os = await prisma.preventiveOS.upsert({
            where: {
                machineId_natureId_weekCode_actionsUniqueKey: {
                    machineId,
                    weekCode,
                    natureId,
                    actionsUniqueKey
                }
            },
            update: osData,
            create: osData,
            include: {
                actions: {
                    include: {
                        nature: true, machine: true
                    }
                }, nature: true, machine: true,
            }
        })
        return os
    } catch (error) {
        throw error
    }
}


export const executeServiceOrdersParamsSchema = z.object({
    id: z.number(),
    date: z.string(),
    workerId: z.number(),
    duration: z.number(),
    IdsOfActionsTaken: z.array(z.object({ id: z.number() })).optional(),
})

export type ExecuteServiceOrdersType = z.input<typeof executeServiceOrdersParamsSchema>

export async function executeServiceOrders({ date, id, workerId, duration }: ExecuteServiceOrdersType) {
    try {

        const os = await prisma.preventiveOS.update({
            where: {
                id
            },
            data: {
                date: new Date(date),
                responsibleId: workerId,
                duration,
                concluded: true
            },
            include: {
                actions: {}
            }
        })

        os.actions.forEach(async ({ id }, index) => {

            const weekYearNumber = weekYearStringToNumber(os.actions[index].nextExecution)
            const nextWeek = incrementWeekYear(
                weekYearNumber.week,
                weekYearNumber.year,
                os.actions[index].frequency
            )
            const nexeWeekString = weekYearToString(nextWeek.week, nextWeek.year)

            await prisma.preventiveAction.update({
                where: { id },
                data: {
                    nextExecution: nexeWeekString
                }
            })

            await prisma.preventiveActionTaken.create({
                data: {
                    date: new Date(date),
                    weekCode: os.weekCode,
                    actionId: id,
                    osId: os.id,
                },
            })

        })

        return os
    } catch (error) {
        throw error
    }
}


const generateActionsUniqueKeyParmsSchema = z.object({
    id: z.number().optional(),
    machineId: z.number(),
    natureId: z.number(),
})
type GenerateActionsUniqueKeyParms = z.infer<typeof generateActionsUniqueKeyParmsSchema>[]
export function generateActionsUniqueKey(actions: GenerateActionsUniqueKeyParms) {
    let key = ''
    actions.forEach(({ id, machineId, natureId }) => key += `A-I${id}/M${machineId}/N${natureId}_`)
    return key
}