import { z } from 'zod'

export const machineInfoSchema = z.object({
    id: z.number(),
    tag: z.string(),
    technology: z.string(),
    ute: z.string()
})

export type MachineInfoType = z.infer<typeof machineInfoSchema>
