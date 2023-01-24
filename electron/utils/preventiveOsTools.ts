import { ostring, z } from "zod";
import prisma from "../services/prisma"
import { PreventiveOS } from '../../database/client'
import {
    incrementWeekYear,
    weekYearStringToNumber,
    weekYearToString,
    weekYearRegex
} from "./weekTools"

const machineSchema = z.object({
    id: z.number(),
    tag: z.string(),
    technology: z.string(),
    ute: z.string()
})

const natureSchema = z.object({
    id: z.number(),
    name: z.string()
})

export const actionsSchema = z.object({
    id: z.number(),
    description: z.string(),
    machineId: z.number(),
    excution: z.string(),
    frequency: z.number(),
    natureId: z.number(),
    nextExecution: z.string().regex(weekYearRegex),
    preventiveOSId: z.number().nullable(),
})

export const serviceOrdersSchema = z.object({
    id: z.number().optional(),
    concluded: z.boolean().nullable().optional(),
    responsibleId: z.number().nullable().optional(),
    date: z.date().nullable().optional(),
    machineId: z.number(),
    weekCode: z.string().regex(weekYearRegex),
    natureId: z.number(),
    actions: z.array(actionsSchema),
    actionsUniqueKey: z.string(),
    machine: machineSchema.optional(),
    nature: natureSchema.optional(),
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
                    },
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
                    where:{
                        weekCode,
                        machineId: mac.id,
                        natureId: nat.id,
                        concluded: true,
                    },
                    include: {actions: true, nature:true, machine: true}
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
                connect: actions.map(({ id }) => ({ id }))
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
            include: {actions: true, nature:true, machine: true}
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
    IdsOfActionsTaken: z.array(z.object({ id: z.number() })).optional(),
})

export type ExecuteServiceOrdersType = z.input<typeof executeServiceOrdersParamsSchema>

export async function executeServiceOrders({ date, id, workerId, IdsOfActionsTaken }: ExecuteServiceOrdersType) {
    try {

        const os = await prisma.preventiveOS.update({
            where: {
                id
            },
            data: {
                date: new Date(date),
                responsibleId: workerId,
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