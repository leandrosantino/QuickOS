
import { useEffect } from 'react'
import { usePages } from '../../../hooks/usePages'

interface type {
  week: number;
  year: number
}

export function ServiceOrders({week, year} : type) {

  const {backPage} = usePages()

  return (
    <div
      className="
        w-full h-full
      "
    >
      {`${week}, ${year}`}
      <button onClick={()=>backPage()} >back</button>
    </div>
  )
}



