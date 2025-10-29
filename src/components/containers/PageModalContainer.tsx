import { ReactNode } from 'react'

interface PageModalContainerProps {
  children?: ReactNode;
  onClick?: () => void;
  width: string;
  height: string;
}

export function PageModalContainer({ children, onClick, width ,height }: PageModalContainerProps) {

  return (
    <>
      <div
        className={`
          h-full
          w-screen
          absolute top-0 left-0
          flex justify-center items-center
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
          style={{
            width, height
          }}
          className="z-60 absolute"
        >
          {children}
        </div>

      </div>

    </>
  )
}


