import { ReactNode } from 'react'


interface CardsContainerProps {
    children?: ReactNode;
    className?: string | undefined;
    title: string;
}


export function Card({children, className, title} : CardsContainerProps) {
  return (

    <div className='text-gray-900 w-full h-full mt-2' >
      <h3 className='h-titlecard text-lg font-medium p-1' >{title}</h3>
      <div 
        className={`
            bg-gray-400 
            rounded-2xl 
            flex flex-warp
            justify-center
            items-center
            shadow-md
            h-card

        ` + className} 
      >
        {children}
      </div>
    </div>
  )
}
