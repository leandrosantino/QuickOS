
import { useEffect } from 'react'
import { usePages } from '../../../hooks/usePages'
import { PreventiveOsRoutes } from '../../../routes/preventive.routes'

export function PreventivePlan() {

  const { currentPage, goToPage } = usePages()

  useEffect(() => {
    if (currentPage === 'Preventive.Plan') goToPage('Preventive.Plan.Calendar', {})
    
  }, [currentPage, goToPage])

  return (
    <div
      className="
        w-full h-full
      "
    >
      <PreventiveOsRoutes />
    </div>
  )
}



