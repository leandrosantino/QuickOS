import React from 'react'
import { IconType } from 'react-icons';

interface TabButtonProps {
  title: string;
  onclick: React.MouseEventHandler;
  activated: boolean; 
  Icon?: IconType;
}

export function TabButton({activated, title, onclick}:TabButtonProps) {
  return (
    <button
      className={`
        h-full px-5 
        align-middle
        ${activated?
          'bg-gray-200 text-gray-900 font-medium border-t-4 border-t-gray-800':
          'text-gray-100'
        }
      `}
      onClick={onclick}
    >
      {title}
    </button>
  )
}
