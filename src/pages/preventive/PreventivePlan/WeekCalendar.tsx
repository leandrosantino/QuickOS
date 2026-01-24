import { useEffect, useState } from "react";
import { PageHeader } from "../../../components/PageHeader";
import { usePages } from "../../../hooks/usePages";
import {BiArrowFromLeft, BiArrowFromRight} from 'react-icons/bi'

import { api } from '../../../utils/trpc'
import { getWeek } from "date-fns";
import { useYear } from "../../../hooks/useYear";

export function WeekCalendar() {

  const { goToPage } = usePages()
  const {setYear, year} = useYear()

  const semanas = new Array<string>(52).fill('teste')

  return (
    <div
      className="
        w-full h-tabPage
        px-5
      "
    >

      <PageHeader title="Calendário de Preventivas" >
        <div
          className="flex flex-row justify-center items-center gap-2"
        >
          <button className="p-2 hover:bg-zinc-200 rounded-md text-lg" onClick={() => setYear(year - 1)} >
            <BiArrowFromRight/>
          </button>
          <div className="!indent-0 justify-center items-center text-lg py-1 px-4 rounded-md border-zinc-700 border">
            <span>{year}</span>
          </div>
          <button className="p-2 hover:bg-zinc-200 rounded-md text-lg" onClick={() => setYear(year + 1)} >
            <BiArrowFromLeft/>
          </button>
        </div>
      </PageHeader>

      <div className="p-1 flex items-center" >
        <span className="font-medium mr-3" >Legenda:</span>
        <div className="flex p-1 justify-center items-center gap-1" >
          <div className="bg-zinc-500 w-5 h-5 rounded-full" ></div>
          <span className="mr-2" >Pendente</span>
        </div>
        <div className="flex p-1 justify-center items-center gap-1" >
          <div className="bg-orange-500 w-5 h-5 rounded-full" ></div>
          <span className="mr-2" >Atrasado</span>
        </div>
        <div className="flex p-1 justify-center items-center gap-1" >
          <div className="bg-green-500 w-5 h-5 rounded-full" ></div>
          <span className="mr-2" >Concluído</span>
        </div>
      </div>

      <div
        className="
          w-full h-[75%] mt-5
          grid grid-cols-8 grid-rows-7 gap-2
        "
      >
        {
          semanas.map((entry, index) => (
            <WeekCard
              onClick={() => goToPage('Preventive.Plan.Calendar.ServiceOrders', {
                _week: index + 1, _year: year
              })}
              key={index}
              week={index + 1}
              year={year}
            />
          ))
        }
      </div>

    </div>
  )
}

interface WeekCardType {
  week: number,
  year: number,
  onClick: () => void
}

function WeekCard({ week, year, onClick }: WeekCardType) {
  const { revalidate } = usePages()
  const { data, refetch } = api.preventive.getcountPreventiveOs.useQuery({ week, year })
  const [isDefeated, setIsDefeated] = useState<boolean>(false)
  const [percent, setPercent] = useState<number>(0)

  useEffect(() => {refetch()}, [revalidate, refetch])

  useEffect(() => {
    setIsDefeated(false)
    let value: number = 0
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentWeek = getWeek(now)

    if (data) {
      if (data?.unfinished > 0 || data?.finished > 0) {
        value = data.finished === 0 ? 0 : (data.finished / (data.finished + data.unfinished)) * 100
        if(year < currentYear) setIsDefeated(true)
        if(year === currentYear && week < currentWeek) setIsDefeated(true)
      }
    }
    setPercent(Math.round(value))
  }, [week, year, data])

  return (
    <div
      className="
        w-full h-full
        bg-zinc-200 rounded-md
        flex flex-col justify-center items-center
        font-medium text-xl
        cursor-pointer
        active:bg-opacity-90
        hover:bg-opacity-70
        shadow-md border border-zinc-500
        overflow-auto
      "
      onClick={() => onClick()}
    >
      <div
        className={`
          w-full h-full
          flex flex-row justify-center items-center
        `}
      >
        {week}
      </div>
      <div
        className={`
          w-full h-1.5
          ${isDefeated ? 'bg-orange-500' : 'bg-zinc-500'}
        `}
      >
        <div
          style={{
            width: percent + '%'
          }}
          className={`
            h-1.5
            bg-green-500
          `}
        ></div>
      </div>
    </div>
  )
}
