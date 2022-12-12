import React from 'react'
import { SelectionBox, Option } from '../forms/SelectionBox'

interface FilterFrameProps {
  width?: number;
}

export function FilterFrame({ width }: FilterFrameProps) {
  return (
    <div
      className={`
        h-[80%]
        grid grid-cols-4 gap-3
        ${
          width?
          `w-[${width}%]`:
          'w-[40%]'
        }
        
      `}
    >
      <SelectionBox>
        <Option value='M01' title='M01' />
        <Option value='M02' title='M02' />
      </SelectionBox>

      <SelectionBox>
        <Option value='Jan' title='01' />
        <Option value='Jan' title='02' />
      </SelectionBox>

      <SelectionBox>
        <Option value='Jan' title='Jan' />
        <Option value='Jan' title='Fev' />
      </SelectionBox>

      <SelectionBox>
        <Option value='Jan' title='2022' />
        <Option value='Jan' title='2023' />
      </SelectionBox>

    </div>
  )
}
