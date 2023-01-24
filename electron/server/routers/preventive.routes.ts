import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import prisma from '../../services/prisma'
import { internalServerError, successResponse, SuccessResponseSchema } from '../responseMessages'

import {
    assembleServiceOrders,
    registerServiceOrders,
    executeServiceOrders,
    serviceOrdersSchema,
    executeServiceOrdersParamsSchema,
    actionsSchema
} from '../../utils/preventiveOsTools'

const t = initTRPC.create()

export const preventive = t.router({

    assembleServiceOrders: t.procedure
        .input(z.object({
            year: z.number(),
            week: z.number()
        }))
        .output(z.array(serviceOrdersSchema))
        .query(async ({ input }) => {
            try {
                const OSs = await assembleServiceOrders(input.week, input.year)
                return OSs
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    registerServiceOrders: t.procedure
        .input(serviceOrdersSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await registerServiceOrders(input)
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
        .query(async () => {
            try {
                const actions = await prisma.preventiveAction.findMany()
                return actions
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    createActions: t.procedure
        .input(actionsSchema)
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
    updateActions: t.procedure
        .input(z.object({
            id: z.number(),
            data: actionsSchema
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

})