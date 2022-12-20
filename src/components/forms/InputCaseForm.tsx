import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react'

interface InputCaseFormProps {
    children: ReactNode;
    labelName: string;
    className?: string;
}

export function InputCaseForm({children, labelName, className}:InputCaseFormProps) {

  return (
    <div
    className={`
      min-w-[100px] h-16
      flex flex-col justify-center items-start
      border-b border-gray-900
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

    <div
      className="flex flex-row justify-center items-center w-full h-full"
    >
      {children}
    </div>

  </div>
  )
}
