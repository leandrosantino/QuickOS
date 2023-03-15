import {z} from 'zod'

export const workerSchema = z.object({
  id: z.number(),
  registration: z.number(),
  name: z.string(),
  class: z.string(),
})
export const machineSchema = z.object({
  id: z.number(),
  tag: z.string(),
  technology: z.string(),
  ute: z.string()
})
export const natureSchema = z.object({
  id: z.number(),
  name: z.string()
})