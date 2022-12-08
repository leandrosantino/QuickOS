import React from 'react'
import { SelectionBox, Option } from '../forms/SelectionBox'

export function DataFilterFrame() {
  return (
    <div
        className='
            w-[30%] h-[80%]
            grid grid-cols-3 gap-3 
        '
    >
        <SelectionBox>
            <Option value='Jan' title='01'/>
            <Option value='Jan' title='02'/>
        </SelectionBox>
        
        <SelectionBox>
            <Option value='Jan' title='Jan'/>
            <Option value='Jan' title='Fev'/>
        </SelectionBox>

        <SelectionBox>
            <Option value='Jan' title='2022'/>
            <Option value='Jan' title='2023'/>
        </SelectionBox>
    </div>
  )
}
