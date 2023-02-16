import React from 'react'
import { PageModalContainer } from '../../../components/containers/PageModalContainer'
import { usePages } from '../../../hooks/usePages'
import { ServiceOrderType } from '../../../utils/schemas'

interface ExecuteServiceProps {
  data: ServiceOrderType
}

export function ExecuteServiceOrderForm({ data }: ExecuteServiceProps) {

  const { backPage } = usePages()

  return (
    <PageModalContainer
      onClick={() => backPage()}
      width="60%"
      height="60%"
    >

      <div
        className="
          w-full h-full p-5 pb-5
          bg-gray-200 z-50
          rounded-3xl
        "
      >

      </div>

    </PageModalContainer>
  )
}
