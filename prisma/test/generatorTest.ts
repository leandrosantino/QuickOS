import { string } from 'zod';
import { PrismaClient } from '../../database/client'

export const prisma = new PrismaClient()

async function main() {
    try {

        const OSs = await assembleOs(34, 2023)
        console.log(JSON.stringify(OSs, null, 2))
        if(OSs.length > 0){
            for await (let os of OSs){
                await generateOS(os)
            }
        }

    } catch (error) {
        console.log(String(error))
    }
}

interface preventiveOsParams {
    machineId: number;
    week: number;
    actionsIds: { id: number }[],
    year: number;
    natureId: number
}

async function assembleOs(week: number, year: number) {

    try {
        const OSs: preventiveOsParams[] = []

        const machines = await prisma.machine.findMany()
        const natures = await prisma.nature.findMany()

        for await (let mac of machines){
            for await (let nat of natures){
                const actions = await prisma.preventiveAction.findMany({
                    where: {
                        nextExecution: week,
                        machineId: mac.id,
                        natureId: nat.id,
                    },
                })
                
                if (actions.length > 0) {
                    OSs.push({
                        week, year,
                        machineId: mac.id,
                        natureId: nat.id,
                        actionsIds: actions.map(({ id }) => { return { id } })
                    })
                }
            }
        }
        return OSs
    } catch (error) {
        throw error
    }

}

async function generateOS({ machineId, week, actionsIds, year, natureId }: preventiveOsParams) {
    try {
        const os = await prisma.preventiveOS.upsert({
            where: {
                machineId_natureId_week_year: {
                    machineId,
                    week,
                    year,
                    natureId
                }
            },
            update: {},
            create: {
                machineId,
                week,
                year,
                natureId,
                concluded: false,
                actions: {
                    connect: actionsIds
                }
            }
        })
        return os
    } catch (error) {
        throw error
    }
}


interface RegisterOsParams {
    id: number;
    date: Date;
    workerId: number,
}

async function registerOs({ date, id, workerId }: RegisterOsParams) {
    try {
        const os = await prisma.preventiveOS.update({
            where: {
                id
            },
            data: {
                date,
                responsibleId: workerId,
                concluded: true
            },
            include: {
                actions: {}
            }
        })
        os.actions.forEach(async ({ id }, index) => {
            await prisma.preventiveAction.update({
                where: { id },
                data: {
                    nextExecution: os.actions[index].nextExecution +
                        os.actions[index].frequency
                }
            })
        })
        return os
    } catch (error) {
        throw error
    }
}

main()