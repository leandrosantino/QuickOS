import prisma from "../utils/prisma"

import {
    GetActionsParamsType,
} from '../../schemas/preventive'

export async function getActions(input: GetActionsParamsType) {
    try {
        const { machineId, natureId, searchText, weekCode, showIgnore } = input
        const nextExecution = weekCode
        const actions = await prisma.preventiveAction.findMany({
            skip: input.cursor === 1 ? 0 : 1,
            take: input.limit,
            cursor: { id: input?.cursor },
            orderBy: { id: 'asc' },
            where: {
                OR: {
                    description: { contains: searchText },
                },
                ...machineId >= 0 ? { machineId } : {},
                ...natureId >= 0 ? { natureId } : {},
                ...nextExecution != '' ? { nextExecution } : {},
                ...showIgnore ? {} : { ignore: false }
            },
            include: {
                nature: true, machine: true, _count: { select: { actionsTaken: true } }
            }
        })
        return actions
    } catch (error) {
        throw error
    }
}
