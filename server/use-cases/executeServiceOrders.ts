import { differenceInMinutes } from 'date-fns'
import prisma from "../utils/prisma"
import {
    incrementWeekYear,
    weekYearStringToNumber,
    weekYearToString,
} from "../utils/weekTools"

import {
    ExecuteServiceOrdersType,
} from '../../schemas/preventive'

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
