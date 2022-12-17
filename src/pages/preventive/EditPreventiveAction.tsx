import React from 'react'
import { PreventiveActions } from './PreventiveActions'

interface EditPreventiveActionProps {
  data:AcctionsType
}

export function EditPreventiveAction({data}:EditPreventiveActionProps) {
  return (
    <PreventiveActions>
      <div
        className="
        w-[50%] h-[70%] 
        bg-gray-200 z-50
        absolute rounded-3xl
      "
      >
        {data.id}
      </div>
    </PreventiveActions>
  )
}
