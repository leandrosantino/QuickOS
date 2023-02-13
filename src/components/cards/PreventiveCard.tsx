import React from 'react'

import { VscDebugBreakpointLogUnverified, VscDebugBreakpointLog } from 'react-icons/vsc'
import { BsPrinterFill } from 'react-icons/bs'
import { InputButton } from '../forms/InputButton'
import { ServiceOrderType } from '../../utils/schemas'
import { api } from '../../utils/trpc'
import { ipc } from '../../utils/ipc'

interface PreventiveCardProps {
  data: ServiceOrderType
}

export function PreventiveCard({ data }: PreventiveCardProps) {
  
  const responsable = api.main.getWorker.useQuery(data?.responsibleId?data?.responsibleId:0)

  function toDate(entry:string){
    let date = entry.split('T')
    date = date[0].split('-')
    return `${date[2]}/${date[1]}/${date[0]}`
  }
  
  return (
    <div
      className='
        w-full h-full p-2
        flex flex-warp flex-col
        justify-start items-center
        shadow-md rounded-2xl 
        bg-gray-400 
        text-gray-900
      '
    >
      <header
        className={`
          flex flex-row justify-center items-center w-full px-2
          border-b-2 ${data.concluded?'border-green-600':'border-gray-900'} font-medium text-lg 
        `}
      >
        <div className='w-1/2 text-start py-2' >Nº {data.id}</div>
        <div className='w-1/2 text-end py-2' >{data.machine?.tag}</div>
      </header>

      {
        data.date &&
        <div
          className='w-full flex flex-row justify-between p-1'
        >
          <div> <><span className='mr-1 font-medium' >Data:</span> {toDate(data.date)}</> </div>
          <div> <span className='mr-1 font-medium' >Duração:</span> {10} min</div>
        </div>
      }

      <ul
        className="
          flex flex-col justify-center items-start w-full mt-2
        "
      >
        {
          data.actions.map((entry, index) => (
            <li
              key={index}
              className="
                w-full pl-2
                flex flex-row 
                justify-start items-center
              "
            >
              {
                data.concluded?
                  <span className='text-green-500'><VscDebugBreakpointLog /></span> :
                  <span><VscDebugBreakpointLogUnverified /></span>
              }
              <div
                className="
                  p-1 text-lg
                "
              >{entry.description}</div>
            </li>
          ))
        }
      </ul>

      <div
        className="
          h-full w-full
          flex flex-row justify-end items-end
          
        "
      >
        <div
          className={`
            w-full mt-2
            border-t ${data.concluded?'border-green-600':'border-gray-500'} p-2
            flex flex-row justify-end 
          `}
        >
          {
            data.concluded ?
              <div
                className="
                  h-full w-full text-base
                  flex flex-row justify-center items-center
                "
              >
                <div className="w-1/2 flex justify-start items-center" >
                  <span className='mr-1 font-medium '>Responsável:</span>
                  {responsable.data?.name}
                </div>
                <div className={`
                  w-1/2 flex justify-end items-center font-bold
                 text-green-600
                `} >
                  Concluído 
                </div>
              </div>
              :

              <InputButton 
                title='Imprimir'
                className="text-gray-100 bg-orange-500 "
                Icon={BsPrinterFill}
                onClick={()=>{
                  ipc.send('printServiceOrder', data)
                }}
              />

          }
        </div>
      </div>

    </div>
  )
}
