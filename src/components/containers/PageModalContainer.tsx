import { ReactNode } from 'react'
import { usePages } from '../../hooks/usePages'

interface PageModalContainerProps {
  children?: ReactNode;
  onClick?: () => void;
  width: number | string;
  height: number | string;
}

export function PageModalContainer({ children, onClick, width ,height }: PageModalContainerProps) {

  const { sideMenuIsReduce } = usePages()

  return (
    <>
      <div
        className={`
          h-tabPage 
          absolute top-[58px] z-40
          flex justify-center items-center
          ${sideMenuIsReduce ?
            'w-[calc(100vw-50px)] left-[50px]' :
            'w-[calc(100vw-208px)] lg1:w-test xl:w-[calc(100vw-216px)] left-[216px]'
          }
        `}
      >

        <div
          className='
            w-full h-full 
            bg-gray-900 bg-opacity-50
          
          '
          onClick={onClick}
        ></div>

        <div
          className={`
            z-60 absolute 
            ${'w-[' + String(width) +  ']'}
            ${'h-[' + String(height) +  ']'}
          `}
        >
          {children}
        </div>

      </div>

    </>
  )
}


