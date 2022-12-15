import { PreventiveCard } from "../../components/cards/PreventiveCard";
import { ScrollContainer } from "../../components/containers/ScrollContainer";
import { FilterFrame } from "../../components/dashboard/FilterFrame";
import { PageHeader } from "../../components/PageHeader";

const data: PreventiveType[] = [
  {
    id: 105,
    tag: 'M20',
    actions: [
      { description: 'Troca do Relé', concluded: true },
      { description: 'Troca do Filtro', concluded: true },
      { description: 'Troca do Óleo', concluded: true },
    ],
    date: '21/02/2022',
    duration: 43,
    responsible: 'Robert'
  },
  {
    id: 106,
    tag: 'M15',
    actions: [
      { description: 'Troca do Relé', concluded: true },
      { description: 'Troca do Filtro', concluded: true },
      { description: 'Troca da Bomba', concluded: true },
      { description: 'Troca do Disjuntor', concluded: false },
      { description: 'Troca do Oring', concluded: false },
    ],
    date: '21/03/2022',
    duration: 25,
    responsible: 'Felipe'
  },
  {
    id: 106,
    tag: 'M15',
    actions: [
      { description: 'Troca do Relé', concluded: true },
      { description: 'Troca do Filtro', concluded: true },
      { description: 'Troca da Bomba', concluded: true },
      { description: 'Troca do Disjuntor', concluded: false },
      { description: 'Troca do Oring', concluded: false },
    ],
    date: '21/03/2022',
    duration: 25,
    responsible: 'Felipe'
  },
  {
    id: 106,
    tag: 'M15',
    actions: [
      { description: 'Troca do Relé', concluded: true },
      { description: 'Troca do Filtro', concluded: true },
      { description: 'Troca da Bomba', concluded: true },
      { description: 'Troca do Oring', concluded: false },
    ],
    date: '21/03/2022',
    duration: 25,
    responsible: 'Felipe'
  },
]

export function PreventiveHistoric() {
  return (
    <div
      className="
        w-full h-[100%]
        px-5
      "
    >

      <PageHeader title='Histórico de Preventivas' />

      <div
        className="w-full mt-3 flex justify-center items-center"
      >
        <FilterFrame width={70} opened />
      </div>

      <div className="w-full h-[calc(100vh-185px)]">
        <ScrollContainer className="mt-3 h-full  rounded-md" >
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
                  grid grid-cols-2 xl:grid-cols-3 gap-4 px-4 pb-4
                "
              >
                {
                  data.map((entry, index) => (
                    <PreventiveCard key={index} data={entry} />
                  ))
                }
              </div>

          }
        </ScrollContainer>
      </div>

    </div>
  )
}
