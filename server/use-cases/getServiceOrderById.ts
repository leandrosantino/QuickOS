import prisma from "../utils/prisma"

import {
    GetServiceOrderByIdParamsType,
} from '../../schemas/preventive'

export async function getServiceOrderById({ id }: GetServiceOrderByIdParamsType) {
    try {
        const serviceOrder = await prisma.preventiveOS.findUnique({
            where: { id },
            include: {
                nature: true,
                machine: true,
                responsible: true,
                actions: {
                    include: {
                        nature: true, machine: true
                    }
                },
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
        return serviceOrder
    } catch (error) {
        throw error
    }
}
