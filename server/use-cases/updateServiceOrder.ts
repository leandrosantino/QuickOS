import { differenceInMinutes } from 'date-fns'
import prisma from "../utils/prisma"

import {
    UpdateServiceOrderParamsType,
} from '../../schemas/preventive'

export async function updateServiceOrder({ id, data: { date, finishTime, startTime, workers } }: UpdateServiceOrderParamsType) {
    try {
        const duration = differenceInMinutes(new Date(finishTime), new Date(startTime))
        await prisma.preventiveOS.update({
            where: {
                id
            },
            data: {
                date: new Date(date),
                duration,
                startTime: new Date(startTime),
                finishTime: new Date(finishTime),
                concluded: true,
                responsible: {
                    set: workers
                }
            }
        })
    } catch (error) {
        throw error
    }
}
