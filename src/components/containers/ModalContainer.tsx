import React, { ReactNode } from 'react'
import { usePages } from '../../hooks/usePages'

interface ModalContainerProps {
  children?: ReactNode;
}

export function ModalContainer({children}:ModalContainerProps) {

  const { goToPage, sideMenuIsReduce } = usePages()

  return (
    <>
      <div
        className={`
      h-tabPage
      flex flex-row justify-center items-center
      bg-gray-900 bg-opacity-50 
      absolute top-[58px] z-40
      ${sideMenuIsReduce ?
        'w-[calc(100vw-50px)]' :
        'w-[calc(100vw-208px)] lg1:w-test xl:w-[calc(100vw-216px)]'
      }
    `}
        onClick={() => goToPage('Preventive.Actions', {})}
      ></div>
      <div
        className="
        w-[50%] h-[70%] 
        bg-gray-200 z-50
        absolute rounded-3xl
      "
      >
        {children}
      </div>
    </>
  )
}
