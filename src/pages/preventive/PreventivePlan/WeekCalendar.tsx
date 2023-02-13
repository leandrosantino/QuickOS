import { useState } from "react";
import { PageHeader } from "../../../components/PageHeader";
import { usePages } from "../../../hooks/usePages";

import { api } from '../../../utils/trpc'

export function WeekCalendar() {

  const { goToPage } = usePages()

  // eslint-disable-next-line
  const [year, setYear] = useState<number>(2023)

  const semanas = new Array<string>(52).fill('teste')

  return (
    <div
      className="
        w-full h-[100%]
        px-5
      "
    >

      <PageHeader title='Plano Anual de Preventivas' />

      <div
        className="
          w-full h-[75%] mt-5
          grid grid-cols-8 grid-rows-7 gap-2
        "
      >
        {
          semanas.map((entry, index) => (
            <WeekCard
              onClick={()=>goToPage('Preventive.Plan.ServiceOrders', {week:index + 1, year})}
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

  const { data } = api.preventive.getcountPreventiveOs.useQuery({
    weekCode: `${year}-W${String(week).length > 1 ? week : '0' + week}`
  })

  function getPecernt() {
    let value: number = 0
    if (data) {
      if (data?.unfinished > 0 || data?.finished > 0) {
        value = data.finished === 0 ? 0 : (data.finished / (data.finished + data.unfinished)) * 100
      }
    }
    console.log(week, '-', value)
    return value
  }

  const percent = getPecernt()

  return (
    <div
      className="
        w-full h-full 
        bg-gray-300 rounded-md
        flex flex-col justify-center items-center
        font-medium text-xl
        cursor-pointer
        active:bg-opacity-90
        hover:bg-opacity-70
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
          bg-gray-500
        `}
      >
        <div
          className={`
            w-[${percent > 0 ? percent : 0}%] h-1.5
            bg-green-500
          `}
        ></div>
      </div>
    </div>
  )
}
