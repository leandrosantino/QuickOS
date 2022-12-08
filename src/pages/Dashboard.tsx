import { usePages} from "../hooks/usePages"

export interface HomeProps {nome:string}

export function Home() {

  const {goToPage} = usePages()

  return (
      <div 
        className='
          w-full h-full 
          overflow-y-auto
          scrollbar-thumb-purple-500
          scrollbar-thumb-rounded-xl
          scrollbar-track-purple-800
          scrollbar-thin
        '  
      
      >

      </div>
  )
}
