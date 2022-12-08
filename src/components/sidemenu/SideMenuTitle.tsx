import React from 'react'

interface SideMenuTitleProps {
  reduced?: boolean;
}

export default function SideMenuTitle({reduced}:SideMenuTitleProps) {
  return (
    <div
      className={`
        transition-all
        w-full h-16 
        flex justify-center items-center
        text-xl text-gray-100 font-bold


      `}
    >

      {reduced&&
        <div
          className={`
            absolute
          `}
        >
          AP
        </div>
      }
      <div
        className={`transition-all ${reduced?' invisible text-[1px]':'text-xl'}`}>
          Adler Pelzer Group
      </div>
      
    </div>
  )
}
