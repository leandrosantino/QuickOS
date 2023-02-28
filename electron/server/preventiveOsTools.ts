import { differenceInMinutes } from 'date-fns'
import prisma from "../services/prisma"
import {
    incrementWeekYear,
    weekYearStringToNumber,
    weekYearToString,
} from "../utils/weekTools"

import {
    AssembleServiceOrdersParamsType,
    ServiceOrdersType,
    ExecuteServiceOrdersType,
    GenerateActionsUniqueKeyParms,
} from './schemas/preventive'


async function proofreaderDataBase(weekCode: string) {
    const os = await prisma.preventiveOS.findMany({
        where: {
            weekCode
        },
        include: {
            _count: { select: { actions: true, actionsTaken: true } }
        }
    })
    os.forEach(async (entry) => {
        if (entry._count.actions == 0 && entry._count.actionsTaken == 0) {
            await prisma.preventiveOS.delete({
                where: { id: entry.id }
            })
        }
    })
}


export async function assembleServiceOrders({ machine, nature, status, week, year }: AssembleServiceOrdersParamsType) {
    try {
        const OSs: ServiceOrdersType[] = []

        const machines = await prisma.machine.findMany()
        const natures = await prisma.nature.findMany()
        const weekCode = weekYearToString(week, year)

        const concluded = status == 'true' ? true : false

        for await (let mac of machines) {
            if (mac.id == machine || machine == -1) {
                for await (let nat of natures) {
                    if (
                        nat.id == nature || nature == -1
                    ) {
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
                            !concluded && OSs.push(await registerServiceOrders(os))
                        }

                        if (concluded || status == 'all') {

                            const os = await prisma.preventiveOS.findMany({
                                where: {
                                    weekCode,
                                    machineId: mac.id,
                                    natureId: nat.id,
                                    concluded: true,
                                },
                                include: {
                                    responsible: true,
                                    nature: true,
                                    machine: true,
                                    actionsTaken: {
                                        include: {
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
                }
            }
        }

        proofreaderDataBase(weekCode)

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


export async function executeServiceOrders({ date, id, workers, finishTime, startTime }: ExecuteServiceOrdersType) {
    try {

        const duration = differenceInMinutes(new Date(finishTime), new Date(startTime))

        const os = await prisma.preventiveOS.update({
            where: {
                id
            },
            data: {
                date: new Date(date),
                responsible: {
                    connect: workers.map(({ id }) => ({ id }))
                },
                duration,
                startTime: new Date(startTime),
                finishTime: new Date(finishTime),
                concluded: true
            },
            include: {
                actions: {}
            }
        })

        for await (let [index, { id }] of os.actions.entries()) {

            // }

            // os.actions.forEach(async ({ id }, index) => {

            const weekYearNumber = weekYearStringToNumber(os.actions[index].nextExecution)
            const nextWeek = incrementWeekYear(
                weekYearNumber.week,
                weekYearNumber.year,
                os.actions[index].frequency
            )
            const nextWeekString = weekYearToString(nextWeek.week, nextWeek.year)

            await prisma.preventiveAction.update({
                where: { id },
                data: {
                    nextExecution: nextWeekString
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

        }

        return os
    } catch (error) {
        throw error
    }
}

export function generateActionsUniqueKey(actions: GenerateActionsUniqueKeyParms) {
    let key = ''
    actions.forEach(({ id, machineId, natureId }) => key += `A-I${id}/M${machineId}/N${natureId}_`)
    return key
}