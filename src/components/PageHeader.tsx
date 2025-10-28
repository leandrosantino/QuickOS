import React, { ReactNode } from 'react'

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div
      className="
        w-full h-14
        flex items-center justify-start
        border-b-2 border-zinc-900
        indent-5 text-zinc-900 text-2xl font-medium
      "
    >
      <div
        className='w-full'
      >
        {title}
      </div>
      <div
        className='w-1/2 h-full text-sm flex justify-end items-center'
      >
        {children}
      </div>
    </div>
  )
}
