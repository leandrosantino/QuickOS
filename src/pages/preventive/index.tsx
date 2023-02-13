
import { useEffect } from 'react'
import { TabButton } from '../../components/Tab/TabButton'
import { TabContainer } from '../../components/Tab/TabContainer'
import { usePages } from '../../hooks/usePages'
import { PreventiveRoutes } from '../../routes/preventive.routes'

export function Preventive() {

  const { currentPage, goToPage } = usePages()

  useEffect(() => {
    if (currentPage === 'Preventive') goToPage('Preventive.Plan', {})
    
  }, [currentPage, goToPage])

  return (
    <div
      className="
        w-full h-full
      "
    >
      <TabContainer>
        <TabButton
          activated={currentPage.search('Preventive.Plan') >= 0}
          onclick={() => { goToPage('Preventive.Plan', {}) }}
          title="Plano Anual"
        />
        <TabButton
          activated={currentPage.split('.')[1] === 'Actions'}
          onclick={() => { goToPage('Preventive.Actions', {}) }}
          title="Ações"
        />
      </TabContainer>

      <PreventiveRoutes />


    </div>
  )
}
