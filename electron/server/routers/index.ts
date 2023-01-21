import { initTRPC } from '@trpc/server'
import {main} from './main.routes'

const trpc = initTRPC.create()

export const appRouter = trpc.router({
    main
})

export type AppRouter = typeof appRouter

