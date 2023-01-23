
import { PrismaClient } from '../../database/client'
import { getYear, getWeek, addWeeks } from 'date-fns'

export const prisma = new PrismaClient()

const weekYearRegex = new RegExp(/\d{4}-W\d{2}/)

async function main() {
    try {

        // const week = incrementWeekYear(53, 2023, 1)
        // console.log(weekYearToString(week.week, week.year))

        // const OSs = await assembleOs(37, 2023)
        // console.log(JSON.stringify(OSs, null, 2))
        // if(OSs.length > 0){
        //     for await (let os of OSs){
        //         await generateOS(os)
        //     }
        // }

        await registerOs({
            id: 9,
            date: new Date(),
            workerId: 1
        })

    } catch (error) {
        console.log(String(error))
    }
}

function incrementWeekYear(week: number, year: number, increment: number) {
    const weekDate = weekYearToDate(week, year)
    const incrementedWeekDate = addWeeks(weekDate, increment)
    return {
        week: getWeek(incrementedWeekDate),
        year: getYear(incrementedWeekDate),
    }
}

function weekYearStringToNumber(string: string){
    try {
        if(!weekYearRegex.test(string)){
            throw new Error('String week not compatible with the standard!')
        }
        return {
            week: Number(string.split('-W')[1]),
            year: Number( string.split('-W')[0]),
        }
    } catch (error) {
        throw error
    }
}

function weekYearToString(week: number, year: number){
    try {
        const weekStr = String(week).length < 2? `0${week}`: week
        const weekYearStr = `${year}-W${weekStr}`
        if(!weekYearRegex.test(weekYearStr)){
            throw new Error('Week and year not compatible with the standard!')
        }
        return weekYearStr
    } catch (error) {
        throw error
    }
     
}

function weekYearToDate(week: number, year: number) {
    const day = (1 + (week - 1) * 7) + 6
    return new Date(year, 0, day)
}

interface PreventiveOsType {
    machineId: number;
    week: number;
    actionsIds: { id: number }[],
    year: number;
    natureId: number
}

async function assembleOs(week: number, year: number) {

    try {
        const OSs: PreventiveOsType[] = []

        const machines = await prisma.machine.findMany()
        const natures = await prisma.nature.findMany()

        for await (let mac of machines) {
            for await (let nat of natures) {

                const actions = await prisma.preventiveAction.findMany({
                    where: {
                        nextExecution: weekYearToString(week, year),
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

async function generateOS({ machineId, week, actionsIds, year, natureId }: PreventiveOsType) {
    try {
        const weekCode = weekYearToString(week, year)
        const os = await prisma.preventiveOS.upsert({
            where: {
                machineId_natureId_weekCode: {
                    machineId,
                    weekCode,
                    natureId
                }
            },
            update: {},
            create: {
                machineId,
                weekCode,
                natureId,
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

            const weekYearNumber = weekYearStringToNumber(os.actions[index].nextExecution)
            const nextWeek = incrementWeekYear(
                weekYearNumber.week,
                weekYearNumber.year, 
                os.actions[index].frequency
            )
            const nexeWeekString = weekYearToString(nextWeek.week, nextWeek.year)

            await prisma.preventiveAction.update({
                where: { id },
                data: {
                    nextExecution: nexeWeekString
                }
            })

            await prisma.preventiveActionTaken.create({
                data:{
                    date: new Date(),
                    weekCode: os.weekCode,
                    actionId: id,
                    osId: os.id,
                },
            })

        })  

        return os
    } catch (error) {
        throw error
    }
}

main()