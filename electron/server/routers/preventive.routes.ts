import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import prisma from '../../services/prisma'
import { internalServerError, successResponse, SuccessResponseSchema } from '../responseMessages'

import {
    assembleServiceOrders,
    executeServiceOrders,
    serviceOrdersSchema,
    executeServiceOrdersParamsSchema,
    actionsSchema,
    actionCreateSchema
} from '../preventiveOsTools'

import {weekYearToString} from '../../utils/weekTools'

const t = initTRPC.create()

export const preventive = t.router({

    getServiceOrders: t.procedure
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
            description: z.string()
        }))
        .query(async ({ input }) => {
            try {
                const actions = await prisma.preventiveAction.findMany({
                    where: {
                        description: { contains: input.description }
                    },
                    include: {
                        nature: true, machine: true, _count:{select:{PreventiveActionTaken:true}}
                    }
                })
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
        .input(z.object({week: z.number(), year: z.number()}))
        .output(z.object({
            finished: z.number(),
            unfinished: z.number(),
        }))
        .query(async ({input})=>{
            try {

                const weekCode = weekYearToString(input.week, input.year)

                const finished = await prisma.preventiveOS.count({
                    where:{
                        weekCode,
                        concluded: true
                    }
                })
                const unfinished = await prisma.preventiveOS.count({
                    where:{
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