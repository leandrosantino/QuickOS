import { z } from 'zod'

export const natureInfoSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type NatureInfoType = z.infer<typeof natureInfoSchema>
