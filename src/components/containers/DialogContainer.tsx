import { ReactNode } from 'react'
import { usePages } from '../../hooks/usePages';

interface PageModalContainerProps {
  children?: ReactNode;
  width: string;
  height: string;
}

export function DialogContainer({ children, width ,height }: PageModalContainerProps) {

  const {sideMenuIsReduce} = usePages()

  return (
    <>
      <div
        className={`
          h-page w-screen
          absolute top-[30px] z-40
          flex justify-end items-center
        `}
      >
        <div
          className={`
            flex justify-center items-center
            h-full bg-gray-900 bg-opacity-50
            ${sideMenuIsReduce ?
              'w-[calc(100vw-50px)]' :
              'w-[calc(100vw-208px)] lg1:w-test xl:w-[calc(100vw-216px)]'
            }
          `}
        >
          <div
            style={{
              width, height
            }}
          >
            {children}
          </div>
        </div>

      </div>

    </>
  )
}


