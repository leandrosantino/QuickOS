import { ReactNode } from 'react'


interface CardsContainerProps {
    children?: ReactNode;
    className?: string | undefined;
    title: string;
}


export function Card({children, className, title} : CardsContainerProps) {
  return (

    <div className='text-white-500 w-full mt-2' >
      <h3 className='text-lg font-normal p-1' >{title}</h3>
      <div 
        className={`
            bg-purple-400 
            rounded-2xl
            flex flex-warp
            justify-center
            items-center
            shadow-md
        ` + className} 
      >
        {children}
      </div>
    </div>
  )
}
