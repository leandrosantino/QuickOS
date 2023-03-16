import type { PrismaCLientType } from '@server/utils/prisma'
import { differenceInMinutes } from 'date-fns'
import {
  incrementWeekYear,
  weekYearStringToNumber,
  weekYearToString,
} from "@server/utils/weekTools"

import {
  AssembleServiceOrdersParamsType,
  ServiceOrdersType,
  ExecuteServiceOrdersType,
} from '@schemas/preventive'

import { generateActionsUniqueKey } from '@server/utils/generateActionsUniqueKey'

export class AssenbleServiceOrders {
  prisma: PrismaCLientType
  constructor(dbclient: PrismaCLientType) {
    this.prisma = dbclient
  }

  async proofreaderDataBase(weekCode: string) {
    const os = await this.prisma.preventiveOS.findMany({
      where: {
        weekCode
      },
      include: {
        _count: { select: { actions: true, actionsTaken: true } }
      }
    })
    os.forEach(async (entry) => {
      if (entry._count.actions == 0 && entry._count.actionsTaken == 0) {
        await this.prisma.preventiveOS.delete({
          where: { id: entry.id }
        })
      }
    })
  }

  async assembleServiceOrders({ machine, nature, status, week, year }: AssembleServiceOrdersParamsType) {
    try {
      const OSs: ServiceOrdersType[] = []

      const machines = await this.prisma.machine.findMany()
      const natures = await this.prisma.nature.findMany()
      const weekCode = weekYearToString(week, year)

      const concluded = status == 'true' ? true : false

      for await (let mac of machines) {
        if (mac.id == machine || machine == -1) {
          for await (let nat of natures) {
            if (
              nat.id == nature || nature == -1
            ) {
              const actions = await this.prisma.preventiveAction.findMany({
                where: {
                  nextExecution: weekCode,
                  machineId: mac.id,
                  natureId: nat.id,
                  ignore: false,
                },
                include: {
                  machine: true, nature: true, actionsTaken: true
                }
              })


              const actionsUniqueKey = generateActionsUniqueKey(actions)

              if (actions.length > 0) {
                const os = {
                  weekCode,
                  machineId: mac.id,
                  natureId: nat.id,
                  actions,
                  actionsUniqueKey,
                }
                !concluded && OSs.push(await this.registerServiceOrders(os))
              }

              if (concluded || status == 'all') {

                const os = await this.prisma.preventiveOS.findMany({
                  where: {
                    weekCode,
                    machineId: mac.id,
                    natureId: nat.id,
                    concluded: true,
                  },
                  include: {
                    responsible: true,
                    nature: true,
                    machine: true,
                    actionsTaken: {
                      include: {
                        action: {
                          include: {
                            nature: true, machine: true
                          }
                        },
                      }
                    }
                  }
                })

                OSs.push(...os)
              }
            }
          }
        }
      }

      this.proofreaderDataBase(weekCode)

      return OSs

    } catch (error) {
      throw error
    }

  }

  async registerServiceOrders({ machineId, weekCode, actions, natureId, actionsUniqueKey }: ServiceOrdersType) {
    try {

      const osData = {
        machineId,
        weekCode,
        natureId,
        actionsUniqueKey,
        actions: {
          connect: actions?.map(({ id }) => ({ id }))
        }
      }

      const os = await this.prisma.preventiveOS.upsert({
        where: {
          machineId_natureId_weekCode_actionsUniqueKey: {
            machineId,
            weekCode,
            natureId,
            actionsUniqueKey
          }
        },
        update: osData,
        create: osData,
        include: {
          actions: {
            include: {
              nature: true, machine: true
            }
          }, nature: true, machine: true,
        }
      })
      return os
    } catch (error) {
      throw error
    }
  }


  async executeServiceOrders({ date, id, workers, finishTime, startTime }: ExecuteServiceOrdersType) {
    try {

      const duration = differenceInMinutes(new Date(finishTime), new Date(startTime))

      const os = await this.prisma.preventiveOS.update({
        where: {
          id
        },
        data: {
          date: new Date(date),
          responsible: {
            connect: workers.map(({ id }) => ({ id }))
          },
          duration,
          startTime: new Date(startTime),
          finishTime: new Date(finishTime),
          concluded: true
        },
        include: {
          actions: {}
        }
      })

      for await (let [index, { id }] of os.actions.entries()) {

        // }

        // os.actions.forEach(async ({ id }, index) => {

        const weekYearNumber = weekYearStringToNumber(os.actions[index].nextExecution)
        const nextWeek = incrementWeekYear(
          weekYearNumber.week,
          weekYearNumber.year,
          os.actions[index].frequency
        )
        const nextWeekString = weekYearToString(nextWeek.week, nextWeek.year)

        await this.prisma.preventiveAction.update({
          where: { id },
          data: {
            nextExecution: nextWeekString
          }
        })

        await this.prisma.preventiveActionTaken.create({
          data: {
            date: new Date(date),
            weekCode: os.weekCode,
            actionId: id,
            osId: os.id,
          },
        })

      }

      return os
    } catch (error) {
      throw error
    }
  }

}
