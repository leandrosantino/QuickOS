import React from 'react'
import { FaQuestion } from 'react-icons/fa'
import { InputButton } from '../forms/InputButton'

export function DialogQuestion({message, title, callback}:DialogProps) {
  return (
    <div
    className="
      w-full h-full
      flex flex-row justify-center items-center
    "
  >

    <div
      className="
        w-[23%] h-full
        flex justify-center items-center
      "
    >
      <div
        className="
          w-[60px] h-[60px]
          rounded-[30px]
          bg-blue-500 text-gray-100
          flex justify-center items-center
        "
      >
        <FaQuestion size={40} />
      </div>
    </div>

    <div
      className="
        w-[77%] h-full px-2
        flex flex-col justify-center items-center
      "
    >

      <div
        className="
          w-full h-[22%]
          font-bold text-2xl
          flex felx-col justify-center items-center
        "
      >
        {title}
      </div>

      <div
        className="
          w-full h-[56%] pt-2
          flex felx-col justify-center items-center
        "
      >
        {message}
      </div>

      <div
        className="
          w-full h-[22%]
          flex justify-end
        "
      >
      <InputButton
        title='Não'
        onClick={() => callback(false)}
        className="
          w-16 mr-2
          bg-red-500
          indent-1
          text-gray-100
        "
      />

      <InputButton
        title='Sim'
        onClick={() => callback(true)}
        className="
          w-16
          bg-gray-500
          indent-1
          text-gray-100
        "
      />
    </div>

    </div>

  </div>
  )
}
