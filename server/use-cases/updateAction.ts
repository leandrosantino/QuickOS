import prisma from "../utils/prisma"

import {
    UpdateActionParamsType,
} from '../../schemas/preventive'

export async function updateAction({ id, data }: UpdateActionParamsType) {
    try {
        await prisma.preventiveAction.update({
            where: { id },
            data
        })
    } catch (error) {
        throw error
    }
}
