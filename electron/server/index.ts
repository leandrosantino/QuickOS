import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'
import { expressHandler } from 'trpc-playground/handlers/express'
import path from 'path'
import { appRouter } from './routers';
import { serviceOrdersSchema } from './schemas/preventive'

const isDev = process.env.IS_DEV

export class Server {

    constructor() { }

    serverPort = 9999

    apiEndpoint = '/trpc'
    playgroundEndpoint = '/playground'

    viewDirectory = isDev ?
        path.join(__dirname, '../../public/views') :
        path.join(__dirname, '../../../app.asar.unpacked/public/views')

    app = express();

    useCreateServiceOrder() {

        this.app.set('views', this.viewDirectory)
        this.app.set('view engine', 'ejs')

        this.app.get('/createServiceorder/', (req, res) => {
            try {
                const data = JSON.parse(String(req.query.data))
                const serviceOrder = serviceOrdersSchema.parse(data)
                // const serviceOrder: z.infer<typeof serviceOrdersSchema> = {}
                res.render('serviceOrder.ejs', { data: serviceOrder })
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        })
    };

    onStart = async () => {
        if (isDev) {
            const chalk = new (await import('chalk')).Chalk
            console.log(`${chalk.green('Start Server successfully !')}\n\nyou can now use the playground in the browser.\n\n    local: ${chalk.yellow(`http://localhost:${this.serverPort}/playground`)}\n\n    to clear the terminal, use ${chalk.blueBright('clear')}\n    to restart the server, use ${chalk.blueBright('reload')}\n\n${chalk.greenBright('- Trpc Server online -')}`)
        }
    }

    async start() {

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

        this.app.listen(this.serverPort, this.onStart)
    }
}


const server = new Server()
server.start()

