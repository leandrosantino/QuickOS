import React from 'react'

import { VscDebugBreakpointLogUnverified, VscDebugBreakpointLog } from 'react-icons/vsc'
import { BsPrinterFill } from 'react-icons/bs'

interface PreventiveCardProps {
  data: PreventiveType
}

export function PreventiveCard({ data }: PreventiveCardProps) {
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
        className="
          flex flex-row justify-center items-center w-full px-2
          border-b-2 border-gray-900 font-medium text-lg 
        "
      >
        <div className='w-1/2 text-start py-2' >Nº {data.id}</div>
        <div className='w-1/2 text-end py-2' >{data.tag}</div>
      </header>

      {
        data.date &&
        <div
          className='w-full flex flex-row justify-between p-1'
        >
          <div> <span className='mr-1 font-medium' >Data:</span> {data.date}</div>
          <div> <span className='mr-1 font-medium' >Duração:</span> {data.duration} min</div>
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
              className="
                w-full pl-2
                flex flex-row 
                justify-start items-center
              "
            >

              {
                false ?
                  <span className='text-green-500'><VscDebugBreakpointLog /></span> :
                  <span><VscDebugBreakpointLogUnverified /></span>
              }

              <div
                key={index}
                className="
                  p-1 text-lg
                "
              >{entry}</div>
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
          className="
            w-full mt-2
            border-t border-gray-500 p-2
            flex flex-row justify-end 
          "
        >
          {
            data.responsible ?
              <div
                className="
                  h-full w-full text-lg
                  flex flex-row justify-start
                "
              >
                <span className='mr-1 font-medium' >Responsável:</span>
                {data.responsible}
              </div>
              :
              <button
                className="
                  text-gray-100 bg-green-500 
                  p-1.5 rounded-lg
                  flex flex-row justify-center items-center
                  hover:opacity-90 active:opacity-80
                "
              >
                Imprimir
                <span className='ml-1'>
                  <BsPrinterFill />
                </span>
              </button>
          }
        </div>
      </div>

    </div>
  )
}
