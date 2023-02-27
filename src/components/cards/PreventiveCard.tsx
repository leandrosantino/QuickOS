import React from 'react'

import { VscDebugBreakpointLogUnverified, VscDebugBreakpointLog, VscSaveAs } from 'react-icons/vsc'
import { BsPrinterFill } from 'react-icons/bs'
import { InputButton } from '../forms/InputButton'
import { ServiceOrderType } from '../../utils/schemas'
// import { api } from '../../utils/trpc'
import { ipc } from '../../utils/ipc'
import { usePages } from '../../hooks/usePages'
import { splitWorkerName } from '../../utils/stringTools'

interface PreventiveCardProps {
  data: ServiceOrderType
}

export function PreventiveCard({ data }: PreventiveCardProps) {

  const { goToPage } = usePages()

  // const responsable = api.main.getWorker.useQuery(data?.responsibleId ? data?.responsibleId : 0)

  const actions = !data.concluded ? data.actions : data?.actionsTaken?.map(entry => entry.action)

  function toDate(entry: string) {
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
          border-b-2 ${data.concluded ? 'border-green-600' : 'border-gray-900'} font-medium text-lg
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
          <div> <span className='mr-1 font-medium' >Duração:</span> {data.duration} min</div>
        </div>
      }

      <ul
        className="
          flex flex-col justify-center items-start w-full mt-2
        "
      >
        {
          actions?.map((entry, index) => (
            <li
              key={index}
              className="
                w-full pl-2
                flex flex-row
                justify-start items-center
              "
            >
              {
                index <= 3 ?
                  <>
                    {
                      data.concluded ?
                        <span className='text-green-500'><VscDebugBreakpointLog /></span> :
                        <span><VscDebugBreakpointLogUnverified /></span>
                    }
                    <div
                      className="
                  p-1 text-lg
                "
                    >{entry.description}</div>
                  </> :
                  <div className="italic font-medium" >mais...</div>
              }
            </li>
          ))
        }
      </ul>

      <div
        className="
          h-full w-full mt-2
          flex flex-col justify-end items-end

        "
      >
        <div className='w-full flex flex-row justify-between items-center'>
          {data.concluded &&
            <div className='w-2/3'>
              <span className='mr-1 font-medium w-full text-end'>Responsáveis:</span><br />
              {data?.responsible?.map(entry => (<div key={entry.id}>
                - {splitWorkerName(entry.name)} <br />
              </div>))}
            </div>}
          <div className='w-1/3 mr-1 font-medium text-end'>
            {data.nature?.name}
          </div>
        </div>

        <div
          className={`
            w-full mt-2
            border-t ${data.concluded ? 'border-green-600' : 'border-gray-500'} p-2
            flex flex-row justify-end
          `}
        >

          <div
            className="
              h-full w-full text-base
              flex flex-row justify-center items-center
            "
          >
            <div className="w-1/2 flex flex-col justify-start items-center" >
              <div className={`w-full mr-1 font-medium ${data.concluded ? 'text-green-600' : ''}`}>{
                data.concluded ? 'Concluído' : 'Em Aberto'
              }</div>
            </div>
            <div className={`
              w-1/2 flex justify-end items-center font-bold
            `} >
              {
                data.concluded ?
                  <InputButton
                    title='Imprimir'
                    className="text-gray-100 bg-green-500 "
                    Icon={BsPrinterFill}
                    onClick={() => {
                      ipc.send('printServiceOrder', data)
                    }}
                  /> :
                  <>
                    <InputButton
                      title='Execultar'
                      className="text-gray-100 bg-yellow-500 mr-2"
                      Icon={VscSaveAs}
                      onClick={() => {
                        goToPage('Preventive.Plan.Calendar.ServiceOrders.Execute', { id: data.id })
                      }}
                    />
                    <InputButton
                      title='Imprimir'
                      className="text-gray-100 bg-orange-500 "
                      Icon={BsPrinterFill}
                      onClick={() => {
                        ipc.send('printServiceOrder', data)
                      }}
                    />
                  </>
              }
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
