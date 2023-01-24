import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'
import {expressHandler} from 'trpc-playground/handlers/express'
import path from 'path'
import {appRouter} from './routers';

import {serviceOrdersSchema} from '../utils/preventiveOsTools'
import {z} from 'zod'

export class Server{

    constructor (){}

    apiEndpoint = '/trpc'
    playgroundEndpoint = '/playground'

    app = express();

    useCreateServiceOrder() {
        this.app.set('view engine', 'ejs')

        this.app.get('/createServiceorder/:data', (req, res)=>{
            try {
                //serviceOrdersSchema.parse(JSON.parse(req.params.data))
                const serviceOrder: z.infer<typeof serviceOrdersSchema> = {
                    id: 14,
                    machineId: 2,
                    weekCode: '2023-W36',
                    responsibleId: null,
                    date: null,
                    natureId: 1,
                    actionsUniqueKey: 'A-I6/M2/N1_',
                    concluded: false,
                    machine: { id: 2, tag: 'M43', ute: 'UTE-5', technology: 'WaterJet' },
                    actions: [
                      {
                        id: 6,
                        description: 'Vedação o eixo da bomba de poliol',
                        machineId: 2,
                        excution: 'Inpesão e troca',
                        frequency: 1,
                        nextExecution: '2023-W36',
                        preventiveOSId: 14,
                        natureId: 1
                      }
                    ],
                    nature: { id: 1, name: 'Mecânica' }
                  }
                res.render(path.join(__dirname, './serviceOrder.ejs'), serviceOrder)
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

