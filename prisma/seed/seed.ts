import { PrismaClient } from '../../database/client'
import fs from 'fs';
import CsvReadableStream from 'csv-reader';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';
import chalk from 'chalk'

const prisma = new PrismaClient()

const CSV = new CsvReadableStream({
    parseNumbers: true,
    parseBooleans: true,
    trim: true,
    asObject: true,
    delimiter: ';'
})
const autodetect = new AutoDetectDecoderStream({ defaultEncoding: '1255' })

type Machine = {
    tag: string;
    ute: string;
    technology: string;
}

type Worker = {
    registration: number;
    name: string;
    class: string;
}

function registerMachines() {
    fs.createReadStream('prisma/seed/src/machines.csv')
        .on('open', () => console.log(chalk.blueBright('\nStart register Machines\n')))
        .pipe(autodetect)
        .pipe(CSV)
        .on('data', (data: Machine) => {
            prisma.machine.create({ data })
                .then(() => console.log(`${chalk.greenBright('Successfully saved line!')} => ${data.tag}`))
                .catch(() => console.log(`${chalk.redBright('Fail!')} => Erro in ${data.tag} `))
        })
}

function registerWorkers() {
    fs.createReadStream('prisma/seed/src/workers.csv')
        .on('open', () => console.log(chalk.blueBright('\nStart register Workers\n')))
        .pipe(autodetect)
        .pipe(CSV)
        .on('data', async (data: Worker) => {
            prisma.worker.create({ data })
                .then(() => console.log(`${chalk.greenBright('Successfully saved line!')} => ${data.name}`))
                .catch(() => console.log(`${chalk.redBright('Fail!')} => Erro in ${data.name} `))
        })

}

async function main() {
    // registerMachines()
    // registerWorkers()
}

main()