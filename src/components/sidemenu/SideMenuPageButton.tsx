import React from 'react'
import { IconType } from 'react-icons/lib';

interface SideMenuPageButtonProps {
    title: string;
    onclick: React.MouseEventHandler;
    activated: boolean; 
    Icon: IconType;
    reduced: boolean;
}

export function SideMenuPageButton(
    {title, onclick, activated, Icon, reduced}:SideMenuPageButtonProps
){
  return (
    <button 
        onClick={onclick} 
        className={`
            w-[100%] h-10  
            hover:bg-gray-700
            font-medium
            text-lg
            ${activated?
                `border-l-4 text-green-600 border-l-green-600`:
                'text-gray-100'
            }
            flex
            fle-row
            items-center
            justify-center
            transition-all

        `}
    >   
        <div className='w-[80px] flex flex-row justify-center items-center'>
            <Icon size={20} />
        </div>
        {!reduced && <div className='w-[70%] flex flex-row justify-start items-center'>
            {title}
        </div>}
    </button>
  )
}
