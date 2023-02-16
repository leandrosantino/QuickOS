import React, { useState } from 'react'

import { BiSearchAlt } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'

interface InputSearchProps {
  returnSearchText: (value: string) => void
}

export function InputSearch({ returnSearchText }: InputSearchProps) {

  const [searchText, setSearchText] = useState('')

  return (
    <div
      className="
        w-full h-7 
        flex flex-row justify-center items-center 
        border border-gray-900 rounded-lg
      "
    >

      <label
        className="
          h-full w-[10%] text-lg bg-gray-100 
          rounded-bl-lg rounded-tl-lg
          flex flex-row justify-center items-center 
        "
        htmlFor="search"
      >
        <BiSearchAlt />
      </label>


      <input
        className="
          w-[80%] h-full indent-1 bg-gray-100 
          flex flex-row justify-center items-center 
        "
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          returnSearchText(e.target.value)
        }}
        id="search"
        type="text"
      />

      <button
        className="
          w-[10%] h-full text-lg bg-gray-100 
          flex flex-row justify-center items-center 
          rounded-br-lg rounded-tr-lg
          hover:bg-gray-200 active:opacity-80
        "
        onClick={() => {
          setSearchText('')
          returnSearchText('')
        }}
      >
        <span>
          <GrFormClose />
        </span>
      </button>

    </div>
  )
}
