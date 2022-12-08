// import { useEffect, useState } from "react"
import { IoBarChartSharp } from 'react-icons/io5'
import { BalanceCards } from "../components/cards/BalanceCards"
import { Card } from '../components/cards/Card'
import { ScrollContainer } from '../components/containers/ScrollContainer'
import { DataFilterFrame } from '../components/dashboard/DataFilterFrame'

export interface HomeProps {nome:string}



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
        <DataFilterFrame/>
      </div>

      <div
        className="
          mt-5 w-full px-6
          grid grid-cols-2 xl:grid-cols-4 gap-3
          
        "
      >
        <BalanceCards
          Icon={IoBarChartSharp}
          color='green'
          title="MTBF"
          value="243 hrs"
          clickable
        />
        <BalanceCards
          Icon={IoBarChartSharp}
          color='blue'
          title="MTTR"
          value="39 min"
          clickable
        />
        <BalanceCards
          Icon={IoBarChartSharp}
          color='red'
          title="Quantidade de Quebras"
          value="10"
          clickable
        />
        <BalanceCards
          Icon={IoBarChartSharp}
          color='cyan'
          title="Quantidade de Setups"
          value="15"
          clickable
        />
      </div>

      <ScrollContainer className='w-full h-[72%] mt-5 mb-10 xl:mb-0'>
      <div
        className="
          w-full h-[1000px] mt-5 px-6
          grid grid-cols-1 gap-2
          xl:grid-cols-3 xl:h-[600px]
          
        "
      >
      <div className='col-span-1 h-full grid grid-cols-1 grid-rows-6 gap-2'>
      <div className='row-span-6'>
        
          <Card 
            title='MTBF & MTTR / Tecnologia'
          >
            teste
          </Card>

      </div>
      </div>
      <div className='col-span-2 h-full grid grid-cols-3 grid-rows-3 gap-2'>
      <div className='row-span-2 col-span-2'>
          
        <Card 
          title='Progresso das Preventivas'
        >
          teste
        </Card>

      </div>
      <div className='row-span-2 col-span-1'>

        <Card 
          title='Preventivas em Aberto'
        >
          teste
        </Card>

      </div>
      <div className='row-span-1 col-span-3'>

          <Card 
            title='Top 10 - Máquinas Paradas'
          >
            teste
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
