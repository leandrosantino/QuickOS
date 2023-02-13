import { useState } from "react";
import { PageHeader } from "../../components/PageHeader";

import { api } from '../../utils/trpc'

export function PreventivePlan() {

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
          semanas.map((entry, index) => (<WeekCard key={index} week={index + 1} year={year} />))
        }
      </div>

    </div>
  )
}

interface WeekCardType {
  week: number,
  year: number,
}

function WeekCard({ week, year }: WeekCardType) {

  const { data } = api.preventive.getcountPreventiveOs.useQuery({
    weekCode: `${year}-W${String(week).length > 1 ? week : '0' + week}`
  })


  function getPecernt() {
    if (data) {
      console.log(data)
      if (data?.unfinished > 0 || data?.finished > 0) {
        const value = data.finished = 0?0:(data.finished / (data.finished + data.unfinished)) * 100
        return value
      }
    }
    return 0
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
            w-[${percent > 0 ? percent + '%' : '0%'}] h-1.5
            bg-green-500
          `}
        ></div>
      </div>
    </div>
  )
}
