// import { useEffect, useState } from "react"
import { BalanceCards } from "../components/cards/BalanceCards"
import { Card } from '../components/cards/Card'
import { ScrollContainer } from '../components/containers/ScrollContainer'
import { FilterFrame } from '../components/dashboard/FilterFrame'

import { MTBFandMTTRbyTecChart } from '../components/dashboard/charts/MTBFandMTTRbyTecChart'
import { PreventiveProgressChart } from '../components/dashboard/charts/preventiveProgressChart'
import { Top10StoppedMachinesChart } from '../components/dashboard/charts/Top10StoppedMachinesChart'

import { IoIosTimer } from 'react-icons/io'
import { CgTimelapse } from 'react-icons/cg'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { MdWifiProtectedSetup } from 'react-icons/md'
import { PreventiveOpenedList } from "../components/dashboard/PreventiveOpenedList"


export interface HomeProps { nome: string }

export function Home() {


  // const [teste, setTeste] = useState('')

  // useEffect(()=>{
  //   setTeste(window.ipc.sendSync('teste'))
  // }, [])

  return (
    <div
      className='
        w-full h-full 
        overflow-y-auto
        scrollbar-thumb-gray-500
        scrollbar-thumb-rounded-xl
        scrollbar-track-gray-300
        scrollbar-thin
      '
    >

      <div
        className='mt-2 w-full h-8 flex justify-center items-center'
      >
        <FilterFrame />
      </div>

      <div
        className="
          mt-4 w-full px-6
          grid grid-cols-2 xl:grid-cols-4 gap-3
          
        "
      >
        <BalanceCards
          Icon={IoIosTimer}
          color='green'
          title="MTTR"
          value="39 min"
        />
        <BalanceCards
          Icon={CgTimelapse}
          color='blue'
          title="MTBF"
          value="243 hrs"
        />
        <BalanceCards
          Icon={MdOutlineReportGmailerrorred}
          color='orange'
          title="Quantidade de Quebras"
          value="10"
        />
        <BalanceCards
          Icon={MdWifiProtectedSetup}
          color='red'
          title="Quantidade de Setups"
          value="15"
        />
      </div>

      <ScrollContainer className='w-full h-[75%] mt-5 mb-10 xl:mb-0'>
        <div
          className="
          w-full h-[1000px] px-6
          grid grid-cols-1 gap-2
          xl:grid-cols-3 xl:h-[520px]
        "
        >
          <div className='col-span-1 h-full grid grid-cols-1 grid-rows-6 gap-2'>
            <div className='row-span-6'>

              <Card
                title='MTBF & MTTR / Tecnologia'
              >
                <MTBFandMTTRbyTecChart />
              </Card>

            </div>
          </div>
          <div className='col-span-2 h-full grid grid-cols-4 grid-rows-4 gap-2'>
            <div className='row-span-2 col-span-2'>

              <Card
                title='Progresso das Preventivas'
              >
                <PreventiveProgressChart />
              </Card>

            </div>
            <div className='row-span-2 col-span-2'>

              <Card
                title='Preventivas em Aberto'
              >
                <PreventiveOpenedList />
              </Card>

            </div>
            <div className='row-span-2 col-span-4'>

              <Card
                title='Top 10 - Máquinas Paradas'
              >
                <Top10StoppedMachinesChart />
              </Card>

            </div>
          </div>
        </div>
      </ScrollContainer>


    </div>
  )
}


/*


  <div
    className='row-span-2  h-full'
  >
    <Card
      title='MTBF & MTTR / Tecnologia'
    >
    teste
    </Card>
  </div>

  <div
    className='row-span-2  h-full'
  >
    <Card
      title='Progresso Das Preventivas'
    >
    teste
    </Card>
  </div>

  <div
    className='row-span-2 h-full'
  >
    <Card
      title='Preventivas em aberto'
    >
    teste
    </Card>
  </div>

  <div
    className='row-span-1 col-span-2 h-full'
  >
    <Card
      title='Top 10'
    >
    teste
    </Card>
  </div>

 */
