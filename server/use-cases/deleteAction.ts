import prisma from "../utils/prisma"

import {
    DeleteActionParamsType,
} from '../../schemas/preventive'

export async function deleteAction({ id }: DeleteActionParamsType) {
    try {
        await prisma.preventiveAction.delete({
            where: { id }
        })
    } catch (error) {
        throw error
    }
}
