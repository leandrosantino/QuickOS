import React, { ReactNode } from 'react'

interface OptionProps {
  value: string;
  title: string;
  selected?: boolean
}

export function Option({ title, value, selected }: OptionProps) {
  return (
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
  children?: ReactNode;
  className?: string;
  labelName: string;
  value?: string;
  onChange: (e:React.ChangeEvent<HTMLSelectElement>)=>void;
}

export function InputSelect({ children, className, labelName, onChange, value }: SelectionBoxProps) {

  const props = value?{value, title: value}:{}

  return (
    <div
      className={`
        min-w-[100px] h-16
        flex flex-col justify-center items-start
      ` + className}
    >

      <label
        htmlFor={labelName}
        className="
          w-full h-1/2 align-middle p-1 font-medium
        "
      >
        {labelName}:
      </label>

      <select
        title={value}
        value={value}
        defaultValue={value} 
        defaultChecked
        onChange={(e)=>onChange(e)}
        className='
          w-full h-1/2 p-[2px]
          bg-transparent
          border-b border-gray-900
        '
      >
        {children}
      </select>

    </div>
  )
}
