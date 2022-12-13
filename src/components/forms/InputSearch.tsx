import React from 'react'

import { BiSearchAlt } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'

export function InputSearch() {
  return (
    <div
      className='h-full flex flex-row justify-center items-center'
    >
      <label
        className='font-medium text-xl flex justify-center items-center h-2 mr-1'
        htmlFor="search"
      ><BiSearchAlt /></label>
      <input
        className='w-full rounded-md py-[1px] text-base indent-1 bg-gray-100 border border-gray-900'
        id='search'
        type="text"
      />
    </div>
  )
}
