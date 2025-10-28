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
          h-full
          w-screen
          absolute top-0 left-0 z-40
          flex justify-end items-center
        `}
      >
        <div
          className={`
            flex justify-center items-center
            h-full bg-gray-900 bg-opacity-50
            w-full
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


