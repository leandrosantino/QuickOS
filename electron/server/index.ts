import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'
import {expressHandler} from 'trpc-playground/handlers/express'

import {appRouter} from './routers';

export class Server{

    constructor (){}

    apiEndpoint = '/trpc'
    playgroundEndpoint = '/playground'

    app = express();

    async start(){

        this.app.use(express.json())

        this.app.use(cors())

        this.app.use(
            this.apiEndpoint,
            trpcExpress.createExpressMiddleware({
                router: appRouter
            })
        )

        this.app.use(
            this.playgroundEndpoint,
            await expressHandler({
                trpcApiEndpoint: this.apiEndpoint,
                playgroundEndpoint: this.playgroundEndpoint,
                router: appRouter
            })
        )

        this.app.listen(9999, () => console.log('Server is online ! - http://localhost:9999/playground'))
    }
}


const server = new Server()
server.start()

