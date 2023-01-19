import { PrismaClient } from '../../database/client'

export const prisma = new PrismaClient()

async function main(){

    await prisma.machine.create({
        data: {
            tag: "M41",
            technology: "WaterJet",
            ute: "UTE-5",
        }
    })
    await prisma.machine.create({
        data: {
            tag: "M42",
            technology: "WaterJet",
            ute: "UTE-5",
        }
    })
    await prisma.machine.create({
        data: {
            tag: "M02",
            technology: "LWF",
            ute: "UTE-1",
        }
    })
    await prisma.preventiveAction.create({
        data:{
            natureId: 2,
            machineId: 2,
            description: "Vedação o eixo da bomba de poliol",
            excution: "Inpesão e troca",
            frequency: 1,
            nextExecution: 32,
        },
    }) 
    await prisma.preventiveAction.create({
        data:{
            natureId: 2,
            machineId: 2,
            description: "Vedação o eixo da bomba de poliol",
            excution: "Inpesão e troca",
            frequency: 1,
            nextExecution: 32,
        },
    }) 
    await prisma.preventiveAction.create({
        data:{
            natureId: 1,
            machineId: 3,
            description: "Vedação o eixo da bomba de poliol",
            excution: "Inpesão e troca",
            frequency: 1,
            nextExecution: 32,
        },
    }) 

}   

main()

/*

 const mecanica = await prisma.nature.create({
        data: {
            name: "Mecânica"
        }
    })
    const eletrica = await prisma.nature.create({
        data: {
            name: "Elétrica"
        }
    })

    const worker = await prisma.worker.create({
        data: {
            name: "Rodigo",
            registration: 16,
            class: "Mecânico"
        }
    })

    const m42 = await prisma.machine.create({
        data: {
            tag: "M45",
            technology: "WaterJet",
            ute: "UTE-5",
        }
    })

    const actions = [
        await prisma.preventiveAction.create({
            data:{
                natureId: mecanica.id,
                machineId: m42.id,
                description: "Painel elétrico de controle da mesa",
                excution: "Limpeza e ajuste",
                frequency: 4,
                nextExecution: 32,
            },
        }),
        await prisma.preventiveAction.create({
            data:{
                natureId: mecanica.id,
                machineId: m42.id,
                description: "Rolamento da esteira",
                excution: "Inspesão e troca",
                frequency: 8,
                nextExecution: 32,
            },
        }),
        await prisma.preventiveAction.create({
            data:{
                natureId: mecanica.id,
                machineId: m42.id,
                description: "Vedação o eixo da bomba de poliol",
                excution: "Inpesão e troca",
                frequency: 1,
                nextExecution: 32,
            },
        })   
    ]
    
    await prisma.preventiveOS.create({
        data: {
            machineId: 1,
            responsibleId: 1,
            week: 5,
            year: 2023,
            natureId: mecanica.id,
            date: new Date(),
            concluded: false,
            actions: {
                connect: [
                    {id: 1},   
                    {id: 2},   
                    {id: 3},   
                ]
            }
            
        }
    })

*/