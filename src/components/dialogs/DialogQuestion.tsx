import React from 'react'
import { FaQuestion } from 'react-icons/fa'
import { InputButton } from '../forms/InputButton'

export function DialogQuestion({message, title, callback}:DialogProps) {
  return (
    <div
    className="
      w-full h-full px-2
      flex flex-col justify-start items-center
    "
  >

      <div
        className="
          w-full h-[22%]
          font-semibold text-2xl
          text-gray-900
          flex felx-col justify-start items-center
        "
      >
        {title}
      </div>

      <div
        className="
        text-gray-900
          w-full h-[56%] pt-2
          flex felx-col justify-start items-center
        "
      >
        {message}
      </div>

      <div
        className="
          w-full h-[22%]
          flex justify-start
        "
      >

      <button
        onClick={() => callback(true)}
        className="
          h-6 w-9 mr-2
          text-[9pt]
          bg-gray-900
          text-gray-100
          rounded
        "
      >
        Sim
      </button>

      <button
        onClick={() => callback(false)}
        className="
          h-6 w-9 mr-2
          text-[9pt]
          bg-gray-900
          text-gray-100
          rounded
        "
      >
        Não
      </button>




    </div>

  </div>
  )
}
