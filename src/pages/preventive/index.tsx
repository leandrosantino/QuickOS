import React, { useEffect } from 'react'
import { TabContainer } from '../../components/Tab/TabContainer'
import { usePages } from '../../hooks/usePages'
import PreventiveRoutes from '../../routes/preventive.routes'

export function Preventive() {

  const {goToPage} = usePages()

  useEffect(()=>{
    goToPage('Preventive.Historic', {})
  }, [])

  return (
    <div 
        className="
            w-full h-full 
        "
    >
        <TabContainer/>
        <PreventiveRoutes/>
    </div>
  )
}
