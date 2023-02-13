

import { PreventiveCard } from '../../../components/cards/PreventiveCard';
import { ScrollContainer } from '../../../components/containers/ScrollContainer';
import { PageHeader } from '../../../components/PageHeader';
import { usePages } from '../../../hooks/usePages'
import { api } from '../../../utils/trpc';

interface type {
  week: number;
  year: number;
}

export function ServiceOrders({week, year} : type) {

  const {data} = api.preventive.getServiceOrders.useQuery({week, year})

  const {backPage} = usePages()

  return (
    <div
      className="
        w-full h-full
        px-5
      "
    >
      <button onClick={()=>backPage()} >back</button>

      <PageHeader title='Ordens de Serviço Preventivas' ></PageHeader>

      <div className="w-full h-[calc(100vh-170px)]">
        <ScrollContainer className="mt-5 h-full  rounded-md" >
          {
            data?.length === 0 ?
              <div
                className="
                  w-full h-full 
                  flex justify-center items-center
                  font-medium
                "
              >
                Nenhuma ação preventiva para esta semana!
              </div>
              : <div
                className="
                  grid grid-cols-2 xl:grid-cols-3 gap-4 p-4 
                "
              >
                {
                  data?.map((entry, index) => (
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



