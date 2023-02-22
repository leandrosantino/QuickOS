import { useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { PageModalContainer } from '../../../components/containers/PageModalContainer'
import { ScrollContainer } from '../../../components/containers/ScrollContainer'
import { InputButton } from '../../../components/forms/InputButton'
import { InputCaseForm } from '../../../components/forms/InputCaseForm'
import { PageHeader } from '../../../components/PageHeader'
import { usePages } from '../../../hooks/usePages'
import { api } from '../../../utils/trpc'
import { splitWorkerName } from '../../../utils/stringTools'

export function ExecuteServiceOrderForm({ id }: { id: number }) {

  const [registration, setRegistration] = useState<number>(0)
  const { data } = api.preventive.getServiceOrderById.useQuery({ id })
  const worker = api.main.getWorkersByRegistration.useQuery(registration)

  const { backPage } = usePages()

  return (
    <PageModalContainer
      onClick={() => backPage()}
      width="70%"
      height="80%"
    >

      <div
        className="
          w-full h-full p-5 pb-5
          bg-gray-200 z-50
          rounded-3xl
        "
      >

        <PageHeader title='Executar Preventiva' >
          <div className="text-lg font-medium" >
            {data?.machine?.tag} - {data?.nature?.name} / Nº {data?.id}
          </div>
        </PageHeader>

        <div className="flex flex-col justify-center items-center" >

          <div className="w-full grid grid-cols-3 gap-10 p-5">
            <InputCaseForm
              labelName='Data'
            >
              <input className='w-full bg-transparent' type="date" />

            </InputCaseForm>

            <InputCaseForm
              labelName='Tempo'
            >
              <input className='w-full bg-transparent' min={0} type="number" />
              <span>min</span>
            </InputCaseForm>

            <InputCaseForm
              labelName='Responsável'
            >
              <input
                className='w-1/4 bg-transparent'
                type="text"
                onKeyUp={(e) => setRegistration(Number(e.currentTarget.value))}
              />
              <span
                className='w-3/4 text-end text-sm'
              >{
                  worker.isLoading ? 'Procurando...' :
                    splitWorkerName(worker?.data?.name)
                }</span>
            </InputCaseForm>
          </div>

          <div className="w-full flex flex-col justify-center items-center" >
            <header
              className="w-full py-1 pl-1.5 font-medium text-xl"
            >Ações:</header>
            <div className="w-full h-[calc(100vh-500px)] border-b border-gray-900">
              <ScrollContainer className="h-full px-2 py-2" >
                <div
                  className="flex flex-col w-full p-0.5 "
                >
                  {data?.actions?.map((entry) => (
                    <li
                      key={entry.id}
                      className="py-0.5"
                    >
                      Nº {entry.id} - {entry.excution}, {entry.description}
                    </li>
                  ))}
                </div>
              </ScrollContainer>
            </div>
          </div>

          <div className="w-full p-5 flex flex-row justify-end items-center" >
            <InputButton
              onClick={() => { }}
              title='Salvar'
              Icon={BiSave}
              className="bg-green-500 text-gray-100 w-40"
            />
          </div>

        </div>

      </div>

    </PageModalContainer>
  )
}

