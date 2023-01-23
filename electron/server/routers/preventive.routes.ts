import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import prisma from '../../services/prisma'
import {internalServerError, successResponse,SuccessResponseSchema} from '../responseMessages'

import {weekYearRegex} from '../../utils/weekTools'
import {
    assembleServiceOrders,
    registerServiceOrders,
    executeServiceOrders,
    serviceOrdersSchema,
    executeServiceOrdersParamsSchema
} from '../../utils/preventiveOsTools'

const t = initTRPC.create()

const actionsSchema = z.object({
    id: z.number(),   
    description: z.string(),
    machineId: z.number(),
    excution : z.string(),
    frequency : z.number(),
    nextExecution: z.string().regex(weekYearRegex)
})

export const preventive = t.router({
    
    assembleServiceOrders: t.procedure
        .input(z.object({
            year: z.number(),
            week: z.number()
        }))
        .output(z.array(serviceOrdersSchema))
        .query(async ({input})=>{
            try {
                const OSs = await assembleServiceOrders(input.week, input.year )
                return OSs
            } catch (error) {
                throw internalServerError(error)
            }
        })    
    ,

    registerServiceOrders: t.procedure
        .input(serviceOrdersSchema)
        .output(SuccessResponseSchema)
        .query(async ({input})=>{
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
        .query(async ({input})=>{
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
    
})