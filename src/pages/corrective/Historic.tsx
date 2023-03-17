import { PageHeader } from '../../components/PageHeader'

import { Card } from '@/components/cards/Card'
import { pageNames } from '@/utils/pageNames'

export function Historic() {

  console.log(pageNames)

  const teste = new Array<string>(52).fill('teste')

  return (
    <div
      className="
       w-full h-full p-5
      "
    >
      <Card title='' />
      <PageHeader title="Plano de Preventivas 2022" />

      <div
        className="
          w-full h-[70%] mt-5
          grid grid-cols-8 grid-rows-7 gap-2
        "
      >
        {
          teste.map((entry, index) => (
            <div
              className="
                w-full h-full
                bg-gray-300 rounded-md
                flex flex-row justify-center items-center
                font-medium text-xl
              "
            >
              {index + 1}
            </div>
          ))
        }
      </div>

    </div>
  )
}
