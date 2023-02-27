import { PrismaClient } from '../../database/client'
import fs from 'fs';
import chalk from 'chalk'
import csv from 'csv-parse/sync'
import { z } from 'zod'

const prisma = new PrismaClient()

const source = 'prisma/seed/src/'

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

const actionsSchema = z.object({
    description: z.string(),
    excution: z.string(),
    machineId: z.number(),
    natureId: z.number(),
    frequency: z.string()
        .transform((value) => {
            const codes = {
                '2M': 8,
                '3M': 12,
                '6M': 24,
                'A': 52,
                'M': 4,
                'S': 1,
            }
            return Number(codes[value])
        }),
    nextExecution: z.string()
        .transform((value) => {
            const week = value.length == 1 ? `0${value}` : value
            return `2023-W${week}`
        }),
})

const reciveAction = z.object({
    ...actionsSchema.shape,
    machine: z.string(),
    nature: z.string(),
})
type ActionType = z.infer<typeof reciveAction>



function csvRead<T>(file: string) {
    return csv.parse(fs.readFileSync(source + file), {
        columns: true,
        delimiter: ';',
        trim: true,
        skip_empty_lines: true,
        autoParseDate: true,

    }) as T[]
}

async function main() {

    console.log('------ Database seed started! -----')

    console.log(chalk.blue('\n<Start Natures Registration >\n'))

    for await (let nature of ['Elétrica', 'Mecânica']) {
        try {
            await prisma.nature.create({
                data: { name: nature }
            })
            console.log(`${chalk.green('    Successfully saved line')} => ${nature}`)
        } catch (error) {
            console.log(`${chalk.red('  Fail! Error saving line')} => ${nature} `)
        }
    }

    console.log(chalk.blue('\n<Start Machine Registration >\n'))
    const machines = csvRead<Machine>('machines.csv')
    for await (let machine of machines) {
        try {
            await prisma.machine.create({
                data: machine
            })
            console.log(`${chalk.green('    Successfully saved line')} => ${machine.tag}`)
        } catch (error) {
            console.log(`${chalk.red('  Fail! Error saving line')} => ${machine.tag} `)
        }
    }

    console.log(chalk.blue('\n<Start Worker Registration >\n'))
    const workers = csvRead<Worker>('workers.csv')
    for await (let worker of workers) {
        worker.registration = Number(worker.registration)
        try {
            await prisma.worker.create({
                data: worker
            })
            console.log(`${chalk.green('    Successfully saved line')} => ${worker.name}`)
        } catch (error) {
            console.log(`${chalk.red('  Fail! Error saving line')} => ${worker.name} `)
        }
    }

    console.log(chalk.blue('\n<Start Actions Registration >\n'))
    const actions = csvRead<ActionType>('actions.csv')
    for await (let action of actions) {
        const identifier = `${action.machine}, ${action.description}`
        try {
            const nature = await prisma.nature.findUnique({
                where: { id: action.nature === 'ELÉTRICO' ? 1 : 2 }
            })
            const machine = await prisma.machine.findUnique({ where: { tag: action.machine } })
            const actionParse = actionsSchema.parse({
                ...action,
                natureId: nature?.id,
                machineId: machine?.id,
            })
            await prisma.preventiveAction.create({
                data: actionParse,
            })
            console.log(`${chalk.green('    Successfully saved line')} => ${identifier}`)
        } catch (error) {
            console.log(`${chalk.red('  Fail! Error saving line')} => ${identifier} `)
        }
    }

    console.log(chalk.blue('\n---- Finished seed ----\n'))
}

main()