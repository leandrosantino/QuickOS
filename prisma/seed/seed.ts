import { PrismaClient } from '../../database/client'
import fs from 'fs';
import CsvReadableStream from 'csv-reader';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';
import chalk from 'chalk'
import { on } from 'events';
import { Console } from 'console';

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

function readCsv<T>(file: string, identifier: string) {
    return new Promise<T[]>((resolve, reject) => {
        const dataList: T[] = []
        console.log(chalk.blueBright(`\nStart register ${identifier}\n`))

        const strean = fs.createReadStream('prisma/seed/src/' + file).pipe(autodetect)
        strean.pipe(CSV)
            .on('data', (data: T) => { dataList.push(data) })
            .on('error', (err: Error) => { reject(err) })
            .on('ready', () => console.log('ok'))
            .on('end', () => { resolve(dataList) })

    })
}

async function registerMachines() {
    try {
        const machines = await readCsv<Machine>('machines.csv', 'Machines')

        for await (let machine of machines) {
            console.log(machine)
        }

        return 'ok'
    } catch (error) {
        console.log(error)
    }

}

async function registerWorkers() {
    try {
        const workers = await readCsv<Worker>('workers.csv', 'Workers')

        for await (let worker of workers) {
            console.log(worker)
        }

        return 'ok'

    } catch (error) {
        console.log(error)
    }


}

async function main() {
    registerMachines()
    await registerWorkers()
}

main()