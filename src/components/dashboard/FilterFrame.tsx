import { SelectionBox, Option } from '../forms/SelectionBox'

interface FilterFrameProps {
  width?: number;
  opened?: boolean;
  search?: boolean;
}

export function FilterFrame({ width, opened }: FilterFrameProps) {
  return (
    <div
      className={`
        h-[80%]
        grid gap-3
        ${
          opened?
          'grid-cols-5':
          'grid-cols-4'
        }
        ${width ?
          `w-[${width}%]` :
          'w-[40%]'
        }
        
      `}
    >

      {
        opened &&
        <SelectionBox>
          <Option value='true' title='Concluído' />
          <Option value='false' title='Em Aberto' />
        </SelectionBox>
      }

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
