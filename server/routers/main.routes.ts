import { initTRPC } from '@trpc/server'
import { z } from 'zod'

import { natureSchema, machineSchema, workerSchema } from '@schemas/main'
import { internalServerError } from '../utils/responseMessages'
import { getMachines } from '../repositories/machineRepository'
import { getNatures } from '../repositories/natureRepository'
import { getWorkers, getWorkerById, getWorkerByRegistration } from '../repositories/workerRepository'

const t = initTRPC.create()


export const main = t.router({
    getMachines: t.procedure
        .output(z.array(machineSchema))
        .query(async () => {
            try {
                const machines = await getMachines()
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
                const natures = await getNatures()
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
                const workers = await getWorkers()
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
                const worker = await getWorkerByRegistration(input)
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
                const worker = await getWorkerById(input)
                return worker
            } catch (error) {
                throw internalServerError(error)
            }
        })

})
