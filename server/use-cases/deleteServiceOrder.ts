import prisma from "../utils/prisma"

import {
    DeleteServiceOrderParamsType,
} from '../../schemas/preventive'

export async function deleteServiceOrder({ id }: DeleteServiceOrderParamsType) {
    try {
        await prisma.preventiveOS.delete({
            where: { id }
        })
    } catch (error) {
        throw error
    }
}
