import { PagesContextProvider } from "../contexts/PagesContext"
import { usePages} from "../hooks/usePages"

import HomeRoutes from "../routes/home.routes"

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

        <div>Testtando</div>
        <button onClick={()=>goToPage('corretivas', {})}>Corretivas</button>
        <button onClick={()=>goToPage('preventivas', {})}>Preventivas</button>

        <HomeRoutes/>

      </div>
  )
}
