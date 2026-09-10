import prisma from "../utils/prisma"
import { weekYearToString } from "../utils/weekTools"

import {
    GetServiceOrderCountParamsType,
} from '../../schemas/preventive'

export async function getServiceOrderCount({ week, year }: GetServiceOrderCountParamsType) {
    try {
        const weekCode = weekYearToString(week, year)

        const finished = await prisma.preventiveOS.count({
            where: {
                weekCode,
                concluded: true
            }
        })
        const unfinished = await prisma.preventiveOS.count({
            where: {
                weekCode,
                concluded: false
            }
        })

        return {
            finished, unfinished
        }
    } catch (error) {
        throw error
    }
}
