import { PreventiveCard } from "../../components/cards/PreventiveCard";
import { ScrollContainer } from "../../components/containers/ScrollContainer";
import { FilterFrame } from "../../components/dashboard/FilterFrame";
import { PageHeader } from "../../components/PageHeader";


const data: PreventiveType[] = [
  {
    id: 105,
    tag: 'M20',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Bomba',
      'Trocar filtro',
    ],
    date: '21/02/2022',
    duration: 10,
    responsible: 'Robert'
  },
  {
    id: 106,
    tag: 'M15',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Bomba',
    ]
  },
  {
    id: 107,
    tag: 'M15',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Rolamento',
      'Trocar Bomba',
      'Trocar filtro',
    ]
  },
  {
    id: 108,
    tag: 'M15',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Bomba',
      'Trocar filtro',
    ]
  },
  {
    id: 109,
    tag: 'M15',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Bomba',
      'Trocar filtro',
    ]
  },
  {
    id: 110,
    tag: 'M15',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Bomba',
      'Trocar filtro',
    ]
  },
  {
    id: 111,
    tag: 'M15',
    actions: [
      'Trocar relé',
      'Trocar Rolamento',
      'Trocar Bomba',
      'Trocar filtro',
    ]
  },
]

function dataSplitter(data: PreventiveType[], part: 1 | 2) {
  const splitterArray: typeof data = []
  const splitter = data.length % 2 === 1 ? (data.length - 1) / 2 : data.length / 2
  data.forEach((entry, index) => {
    if (part === 1 ? index <= splitter : index > splitter) {
      splitterArray.push(entry)
    }
  })
  return splitterArray
}

export function Opened() {

  return (
    <div
      className="
        w-full h-[100%]
        px-5
      "
    >

      <PageHeader title='Preventivas Em Aberto' >
        <FilterFrame width={70} />
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
                  grid grid-cols-1 xl:grid-cols-3 gap-4 p-4 
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