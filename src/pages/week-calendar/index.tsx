
import { useEffect } from 'react'
import { PreventiveOsModalRoutes, PreventiveOsRoutes } from '../../routes/preventive.routes'
import { usePages } from '../../contexts/PagesContext'

export function PreventivePlan() {

  const { currentPage, goToPage } = usePages()

  useEffect(() => {
    if (currentPage === 'Preventive.Plan') goToPage('Preventive.Plan.Calendar', {})

  }, [currentPage, goToPage])

  return (
    <>

      <div
        className="
        w-full h-full
      "
      >
        <PreventiveOsRoutes />
      </div>

      <PreventiveOsModalRoutes />
    </>
  )
}



