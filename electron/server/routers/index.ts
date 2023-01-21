import { initTRPC } from '@trpc/server'

import {main} from './main.routes'
import {preventive} from './preventive.routes'

const trpc = initTRPC.create()

export const appRouter = trpc.router({
    main,
    preventive,
})

export type AppRouter = typeof appRouter

