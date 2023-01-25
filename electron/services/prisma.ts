import { PrismaClient } from '../../database/client'
import isDev from 'electron-is-dev' 
import path from 'path'

// const isDev = true

export default new PrismaClient({
    log: [],
    datasources: {
        db:{
            url: `file:${path.join(__dirname, `${isDev? 
                '../../database/app.db':
                '../../../app.asar.unpacked/database/app.db'
            }`)}`
        }
    }
})