import React from 'react'

interface InputTextProps {
  labelName: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute | undefined
  value?: string | undefined | number;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>)=>void;
}

export function InputText({ labelName, className, type, onChange, value }: InputTextProps) {
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

      <input
        type={type?type:'text'}

        id={labelName}
        className="
          w-full h-1/2 p-[2px]
          bg-transparent
          border-b border-gray-900
        "
      />

    </div>
  )
}
