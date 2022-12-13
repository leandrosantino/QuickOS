
import { useEffect } from 'react'
import { TabButton } from '../../components/Tab/TabButton'
import { TabContainer } from '../../components/Tab/TabContainer'
import { usePages } from '../../hooks/usePages'

import PreventiveRoutes from '../../routes/preventive.routes'

export function Preventive() {

  const {currentPage, goToPage} = usePages()

  useEffect(()=>{
    if(currentPage === 'Preventive') goToPage('Preventive.Historic', {})
  }, [currentPage])

  return (
    <div 
      className="
        w-full h-full
      "
    >
        <TabContainer>
          <TabButton 
            activated={currentPage === 'Preventive.Historic'}
            onclick={()=>{goToPage('Preventive.Historic', {})}}
            title="Hístorico"
          />
          <TabButton
            activated={currentPage.split('.')[1] === 'PreventiveActions'}
            onclick={()=>{goToPage('Preventive.PreventiveActions', {})}}
            title="Ações"
          />
          <TabButton 
            activated={currentPage.search('NewPreventiveActions') > -1}
            onclick={()=>{goToPage('Preventive.NewPreventiveActions', {})}}
            title="Criar Ação"
          />
          <TabButton 
            activated={currentPage.search('Opened') > -1}
            onclick={()=>{goToPage('Preventive.Opened', {})}}
            title="Em Aberto"
          />
          <TabButton 
            activated={currentPage.search('RegisterPreventive') > -1}
            onclick={()=>{goToPage('Preventive.RegisterPreventive', {})}}
            title="Lançamento"
          />
        </TabContainer>

        <PreventiveRoutes/>

    </div>
  )
}
