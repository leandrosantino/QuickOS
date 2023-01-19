import { string } from 'zod';
import { PrismaClient } from '../../database/client'

export const prisma = new PrismaClient()

async function main(){
    try {
        const week = 48
        const actions = await prisma.preventiveAction.findMany({
            where:{
                nextExecution: week,
                machineId: 1,
                natureId: 1,
            },
            include:{
                machine:{},
                nature:{},
            }
        })

        console.log(actions)

        if(actions.length>0){

            const os = await generateOS({
                week,
                actionsIds: actions.map(action=>{return {id: action.id}}),
                year: 2023,
                machineId: 1,
                natureId: 1
            })

            console.log(os)

            console.log(await registerOs({
                date: new Date(),
                id: os.id,
                workerId: 1
            }))
        }
    } catch (error) {
        console.log(String(error))
    }
}

interface generateOsParams {
    machineId: number;
    week: number;
    actionsIds: {id: number}[],
    year: number;
    natureId: number
}

async function generateOS({machineId,week, actionsIds, year, natureId}: generateOsParams){
    try {
        const os = await prisma.preventiveOS.upsert({
            where: {
                machineId_natureId_week_year:{
                    machineId,
                    week,
                    year,
                    natureId
                }
            },
            update:{},
            create:{
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

async function registerOs({date, id, workerId}:RegisterOsParams){
    try {
        const os = await prisma.preventiveOS.update({
            where:{
                id
            },
            data:{
                date,
                responsibleId: workerId,
                concluded: true
            },
            include:{
                actions:{}
            }
        })

        os.actions.forEach(async ({id}, index)=>{
            await prisma.preventiveAction.update({
                where:{id},
                data:{
                    nextExecution: os.actions[index].nextExecution + os.actions[index].frequency
                }
            })
        })


        return os
    } catch (error) {   
        return String(error)
    }
}

main()