import prisma from '../../services/prisma'
import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const main = t.router({
    getMachines: t.procedure
        .output(z.array(z.string()))
        .query(async () => {
            try {
                const machines = await prisma.machine.findMany()
                return machines.map(({tag})=>tag)
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: ''
                })
            }
        })

})