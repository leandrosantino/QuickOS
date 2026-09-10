import prisma from "../utils/prisma"

import {
    ActionCreateType,
} from '../../schemas/preventive'

export async function createAction(input: ActionCreateType) {
    try {
        await prisma.preventiveAction.create({
            data: input
        })
    } catch (error) {
        throw error
    }
}
