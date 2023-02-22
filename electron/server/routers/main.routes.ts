import prisma from '../../services/prisma'
import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

import { natureSchema, machineSchema, workerSchema } from '../schemas/preventive'
import { internalServerError } from '../responseMessages'


export const main = t.router({
    getMachines: t.procedure
        .output(z.array(machineSchema))
        .query(async () => {
            try {
                const machines = await prisma.machine.findMany()
                return machines
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,
    getNatures: t.procedure
        .output(z.array(natureSchema))
        .query(async () => {
            try {
                const natures = await prisma.nature.findMany()
                return natures
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getWorkers: t.procedure
        .output(z.array(workerSchema))
        .query(async () => {
            try {
                const workers = await prisma.worker.findMany()
                return workers
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getWorkersByRegistration: t.procedure
        .input(z.number())
        .output(workerSchema.nullable())
        .query(async ({ input }) => {
            try {
                const worker = await prisma.worker.findUnique({
                    where: {
                        registration: input
                    }
                })
                return worker
            } catch (error) {
                throw internalServerError(error)
            }
        })
    ,

    getWorker: t.procedure
        .input(z.number())
        .output(workerSchema.nullable())
        .query(async ({ input }) => {
            try {
                const worker = await prisma.worker.findUnique({
                    where: { id: input }
                })
                return worker
            } catch (error) {
                throw internalServerError(error)
            }
        })

})