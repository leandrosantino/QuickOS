import prisma from '../../services/prisma'
import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'

import {weekYearRegex} from '../../utils/weekTools'
import {} from '../../utils/preventiveOsTools'

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
    getActions: t.procedure
        .output(z.array(actionsSchema))
        .query(async (req) => {
            try {
                const actions = await prisma.preventiveAction.findMany() 
                return actions
            } catch (error) {
                throw new TRPCError({
                    message: String(error),
                    code: 'INTERNAL_SERVER_ERROR'
                })
            }
        })
        ,
    c: t.procedure
        .input(z.string())
        .output(z.string())
        .mutation((req) => {
            console.log(req.input)
            return req.input + '6'
        })
})