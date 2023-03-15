import { PrismaClient } from '../../database/client'
import path from 'path'

const isDev = process.env.IS_DEV

const prisma = new PrismaClient({
    log: [],
    datasources: {
        db: {
            url: `file:${path.join(__dirname, `${isDev ?
                '../../database/app.db' :
                '../../../app.asar.unpacked/database/app.db'
                }`)}`
        }
    }
})

export default prisma

export type PrismaCLientType = typeof prisma