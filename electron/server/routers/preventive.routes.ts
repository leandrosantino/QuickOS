import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import prisma from '../../services/prisma'
import { internalServerError, successResponse, SuccessResponseSchema } from '../responseMessages'

import {
    assembleServiceOrders,
    executeServiceOrders,
} from '../preventiveOsTools'
import {
    serviceOrdersSchema,
    assembleServiceOrdersParamsSchema,
    executeServiceOrdersParamsSchema,
    actionsSchema,
    actionCreateSchema,
} from '../schemas/preventive'

import { weekYearToString } from '../../utils/weekTools'

const t = initTRPC.create()

export const preventive = t.router({

    getServiceOrders: t.procedure
        .input(assembleServiceOrdersParamsSchema)
        .output(z.array(serviceOrdersSchema))
        .query(async ({ input }) => {
            try {
                const OSs = await assembleServiceOrders(input)
                return OSs
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getServiceOrderById: t.procedure
        .input(z.object({ id: z.number() }))
        .output(z.object({ ...serviceOrdersSchema.shape }).nullable())
        .query(async ({ input }) => {
            try {
                const serviceOrder = await prisma.preventiveOS.findUnique({
                    where: { id: input.id },
                    include: {
                        nature: true,
                        machine: true,
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
                throw internalServerError(error)
            }
        })
    ,

    updateServiceOrder: t.procedure
        .input(z.object({
            id: z.number(),
            data: z.object({
                date: z.date(),
                responsibleId: z.number(),
            }),
        }))
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await prisma.preventiveOS.update({
                    where: { id: input.id },
                    data: input.data
                })
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    deleteServiceOrder: t.procedure
        .input(z.object({
            id: z.number()
        }))
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await prisma.preventiveOS.delete({
                    where: { id: input.id }
                })
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    executeServiceOrders: t.procedure
        .input(executeServiceOrdersParamsSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await executeServiceOrders(input)
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getActions: t.procedure
        .output(z.array(actionsSchema))
        .input(z.object({
            searchText: z.string(),
            weekCode: z.string(),
            machineId: z.number(),
            natureId: z.number(),
            showIgnore: z.boolean(),
            limit: z.number().optional(),
            cursor: z.number().optional(),
        }))
        .query(async ({ input }) => {
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
                // console.log(actions.length)
                return actions
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    createAction: t.procedure
        .input(actionCreateSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await prisma.preventiveAction.create({
                    data: input
                })
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    updateAction: t.procedure
        .input(z.object({
            id: z.number(),
            data: actionCreateSchema
        }))
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await prisma.preventiveAction.update({
                    where: { id: input.id },
                    data: input.data
                })
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    deleteAction: t.procedure
        .input(z.object({ id: z.number() }))
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await prisma.preventiveAction.delete({
                    where: { id: input.id }
                })
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getcountPreventiveOs: t.procedure
        .input(z.object({ week: z.number(), year: z.number() }))
        .output(z.object({
            finished: z.number(),
            unfinished: z.number(),
        }))
        .query(async ({ input }) => {
            try {

                const weekCode = weekYearToString(input.week, input.year)

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

                const resp = {
                    finished, unfinished
                }

                return resp

            } catch (error) {
                throw internalServerError(error)
            }
        })

})