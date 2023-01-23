import { z } from "zod";
import prisma from "../services/prisma"
import { incrementWeekYear, weekYearStringToNumber, weekYearToString } from "./weekTools"

export const serviceOrdersSchema = z.object({
    machineId: z.number(),
    week: z.number(),
    actionsIds: z.array(z.object({ id: z.number() })),
    year: z.number(),
    natureId: z.number()
})

type ServiceOrdersType = z.infer<typeof serviceOrdersSchema>

export async function assembleServiceOrders(week: number, year: number) {

    try {
        const OSs: ServiceOrdersType[] = []

        const machines = await prisma.machine.findMany()
        const natures = await prisma.nature.findMany()

        for await (let mac of machines) {
            for await (let nat of natures) {

                const actions = await prisma.preventiveAction.findMany({
                    where: {
                        nextExecution: weekYearToString(week, year),
                        machineId: mac.id,
                        natureId: nat.id,
                    },
                })

                if (actions.length > 0) {
                    OSs.push({
                        week, year,
                        machineId: mac.id,
                        natureId: nat.id,
                        actionsIds: actions.map(({ id }) => { return { id } })
                    })
                }
            }
        }
        return OSs
    } catch (error) {
        throw error
    }

}

export async function registerServiceOrders({ machineId, week, actionsIds, year, natureId }: ServiceOrdersType) {
    try {
        const weekCode = weekYearToString(week, year)
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
                    connect: actionsIds
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