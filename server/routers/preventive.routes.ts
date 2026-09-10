import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { internalServerError, successResponse, SuccessResponseSchema } from '../utils/responseMessages'

import { assembleServiceOrders } from '../use-cases/assembleServiceOrders'
import { executeServiceOrders } from '../use-cases/executeServiceOrders'
import { getServiceOrderById } from '../use-cases/getServiceOrderById'
import { updateServiceOrder } from '../use-cases/updateServiceOrder'
import { deleteServiceOrder } from '../use-cases/deleteServiceOrder'
import { getActions } from '../use-cases/getActions'
import { createAction } from '../use-cases/createAction'
import { updateAction } from '../use-cases/updateAction'
import { deleteAction } from '../use-cases/deleteAction'
import { getServiceOrderCount } from '../use-cases/getServiceOrderCount'

import {
    serviceOrdersSchema,
    assembleServiceOrdersParamsSchema,
    executeServiceOrdersParamsSchema,
    actionsSchema,
    actionCreateSchema,
    getServiceOrderByIdParamsSchema,
    updateServiceOrderParamsSchema,
    deleteServiceOrderParamsSchema,
    getActionsParamsSchema,
    updateActionParamsSchema,
    deleteActionParamsSchema,
    getServiceOrderCountParamsSchema,
    getServiceOrderCountResultSchema,
} from '../../schemas/preventive'

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
        .input(getServiceOrderByIdParamsSchema)
        .output(z.object({ ...serviceOrdersSchema.shape }).nullable())
        .query(async ({ input }) => {
            try {
                const serviceOrder = await getServiceOrderById(input)
                return serviceOrder
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    updateServiceOrder: t.procedure
        .input(updateServiceOrderParamsSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await updateServiceOrder(input)
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    deleteServiceOrder: t.procedure
        .input(deleteServiceOrderParamsSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await deleteServiceOrder(input)
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
        .input(getActionsParamsSchema)
        .output(z.array(actionsSchema))
        .query(async ({ input }) => {
            try {
                const actions = await getActions(input)
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
                await createAction(input)
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    updateAction: t.procedure
        .input(updateActionParamsSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await updateAction(input)
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    deleteAction: t.procedure
        .input(deleteActionParamsSchema)
        .output(SuccessResponseSchema)
        .mutation(async ({ input }) => {
            try {
                await deleteAction(input)
                return successResponse()
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getcountPreventiveOs: t.procedure
        .input(getServiceOrderCountParamsSchema)
        .output(getServiceOrderCountResultSchema)
        .query(async ({ input }) => {
            try {
                const resp = await getServiceOrderCount(input)
                return resp
            } catch (error) {
                throw internalServerError(error)
            }
        })

})
