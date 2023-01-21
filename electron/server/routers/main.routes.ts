import prisma from '../../services/prisma'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const main = t.router({
    t: t.procedure
        .input(z.string())
        .query((req) => {
            console.log(req.input)
            return req.input + '5'
        }),
    c: t.procedure
        .input(z.string())
        .query((req) => {
            console.log(req.input)
            return req.input + '6'
        })
})