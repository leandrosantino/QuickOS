import { PreventiveCard } from "../../components/cards/PreventiveCard";
import { ScrollContainer } from "../../components/containers/ScrollContainer";
import { PageHeader } from "../../components/PageHeader";

import { TfiReload } from 'react-icons/tfi'

const data: PreventiveType[] = [
  {
    id: 105,
    tag: 'M20',
    actions: [
      {description: 'Troca do Relé', },
      {description: 'Troca do Filtro', },
      {description: 'Troca da Bomba', },
      {description: 'Troca do Disjuntor', },
    ],
  },
  {
    id: 106,
    tag: 'M15',
    actions: [
      {description: 'Troca do Relé',},
      {description: 'Troca do Filtro',},
      {description: 'Troca do Óleo',},
    ]
  },
]

export function PreventiveOpened() {

  return (
    <div
      className="
        w-full h-[100%]
        px-5
      "
    >

      <PageHeader title='Preventivas Em Aberto' >
        <button
          className="
            py-1 px-1.5 bg-green-500 text-gray-100 mr-2
            flex justify-center items-center rounded-lg
          "
        >
          Atualizar 
          <span className="ml-2" >
            <TfiReload width={20} />
          </span>
        </button>
      </PageHeader>
      <div className="w-full h-[calc(100vh-170px)]">
        <ScrollContainer className="mt-5 h-full  rounded-md" >
          {
            data.length === 0 ?
              <div
                className="
                  w-full h-full 
                  flex justify-center items-center
                  font-medium
                "
              >
                Não há Preventivas em aberto no momento
              </div>
              : <div
                className="
                  grid grid-cols-2 xl:grid-cols-3 gap-4 p-4 
                "
              >
                {/* {
                  data.map((entry, index) => (
                    <PreventiveCard key={index} data={entry} />
                  ))
                } */}
              </div>

          }
        </ScrollContainer>
      </div>

    </div>
  )
}