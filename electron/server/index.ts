import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'
import {expressHandler} from 'trpc-playground/handlers/express'
import path from 'path'
import {appRouter} from './routers';

import {serviceOrdersSchema} from '../utils/preventiveOsTools'
import {z} from 'zod'

const isDev = process.env.IS_DEV

export class Server{

    constructor (){}

    apiEndpoint = '/trpc'
    playgroundEndpoint = '/playground'

    viewDirectory = isDev?
    path.join(__dirname, '../../public/views'):
    path.join(__dirname, '../../../app.asar.unpacked/public/views')

    app = express();

    useCreateServiceOrder() {

        console.log(this.viewDirectory)

        this.app.set('views', this.viewDirectory)
        this.app.set('view engine', 'ejs')

        this.app.get('/createServiceorder/', (req, res)=>{
            try {
                console.log(JSON.parse(String(req.query.data)))
                const serviceOrder = serviceOrdersSchema.parse(JSON.parse(String(req.query.data)))
                // const serviceOrder: z.infer<typeof serviceOrdersSchema> = {}
                res.render('serviceOrder.ejs', serviceOrder)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        })
    };

    async start(){

        this.app.use(express.json())

        this.app.use(cors())
        
        this.useCreateServiceOrder()

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

