import React, { ReactNode } from 'react'

interface OptionProps {
    value:string;
    title:string;
    selected?: boolean
}

export function Option({title, value, selected}:OptionProps){
    return(
        <option 
            value={value}
            selected={selected}
            className='
                bg-gray-200 text-sm
            '
        >
            {title}
        </option>
    )
}
 
interface SelectionBoxProps {
    children?: ReactNode
}

export function SelectionBox({children}:SelectionBoxProps) {
  return (
    <select
        className='
            bg-gray-300 rounded-md
            align-middle indent-1
            font-medium py-[2px]
        '
    >
        {children}
    </select>
  )
}
