import { z } from 'zod'

export const workerSchema = z.object({
    id: z.number(),
    registration: z.number(),
    name: z.string(),
    class: z.string(),
})

export type WorkerInfoType = z.infer<typeof workerSchema>
