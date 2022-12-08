import { useEffect, useState } from "react"

export interface HomeProps {nome:string}



export function Home() {


  const [teste, setTeste] = useState('')

  useEffect(()=>{
    setTeste(window.ipc.sendSync('teste'))
  }, [])

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
        {teste}

      </div>
  )
}
