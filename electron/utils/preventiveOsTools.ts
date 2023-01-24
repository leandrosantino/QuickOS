import { z } from "zod";
import prisma from "../services/prisma"
import {
    incrementWeekYear,
    weekYearStringToNumber,
    weekYearToString,
    weekYearRegex
} from "./weekTools"

export const actionsSchema = z.object({
    id: z.number().optional(),
    description: z.string(),
    machineId: z.number(),
    excution: z.string(),
    frequency: z.number(),
    natureId: z.number(),
    nextExecution: z.string().regex(weekYearRegex),
    preventiveOSId: z.number().nullable()
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
})

type ServiceOrdersType = z.infer<typeof serviceOrdersSchema>

export async function assembleServiceOrders(week: number, year: number) {
    try {
        const OSs: ServiceOrdersType[] = []

        const machines = await prisma.machine.findMany()
        const natures = await prisma.nature.findMany()

        const weekCode = weekYearToString(week, year)

        for await (let mac of machines) {
            for await (let nat of natures) {


                const savedOs = await prisma.preventiveOS.findUnique({
                    where: {
                        machineId_natureId_weekCode: {
                            machineId: mac.id,
                            natureId: nat.id,
                            weekCode
                        }
                    },
                    include: { actions: true }
                })


                if(savedOs){
                    OSs.push(savedOs)
                    break
                }

                const actions = await prisma.preventiveAction.findMany({
                    where: {
                        nextExecution: weekCode,
                        machineId: mac.id,
                        natureId: nat.id,
                    },
                })
                
                if (actions.length > 0) {
                    OSs.push({
                        weekCode,
                        machineId: mac.id,
                        natureId: nat.id,
                        actions
                    })
                }
                
            }
        }
        return OSs
    } catch (error) {
        throw error
    }

}

export async function registerServiceOrders({ machineId, weekCode, actions, natureId }: ServiceOrdersType) {
    try {
        const os = await prisma.preventiveOS.upsert({
            where: {
                machineId_natureId_weekCode: {
                    machineId,
                    weekCode,
                    natureId
                }
            },
            update: {},
            create: {
                machineId,
                weekCode,
                natureId,
                actions: {
                    connect: actions
                }
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