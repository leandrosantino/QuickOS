
import { useEffect } from 'react'
import { TabButton } from '../../components/Tab/TabButton'
import { TabContainer } from '../../components/Tab/TabContainer'
import { usePages } from '../../hooks/usePages'
import { PreventiveRoutes } from '../../routes/preventive.routes'

export function Preventive() {

  const { currentPage, goToPage } = usePages()

  useEffect(() => {
    if (currentPage === 'Preventive') goToPage('Preventive.Historic', {})
    
  }, [currentPage, goToPage])

  return (
    <div
      className="
        w-full h-full
      "
    >
      <TabContainer>
        <TabButton
          activated={currentPage === 'Preventive.Historic'}
          onclick={() => { goToPage('Preventive.Historic', {}) }}
          title="Hístorico"
        />
        <TabButton
          activated={currentPage.search('Opened') > -1}
          onclick={() => { goToPage('Preventive.Opened', {}) }}
          title="Em Aberto"
        />
        <TabButton
          activated={currentPage.split('.')[1] === 'Actions'}
          onclick={() => { goToPage('Preventive.Actions', {}) }}
          title="Ações"
        />
        <TabButton
          activated={currentPage.search('RegisterPreventive') > -1}
          onclick={() => { goToPage('Preventive.RegisterPreventive', {}) }}
          title="Lançamento"
        />
      </TabContainer>

      <PreventiveRoutes />


    </div>
  )
}
