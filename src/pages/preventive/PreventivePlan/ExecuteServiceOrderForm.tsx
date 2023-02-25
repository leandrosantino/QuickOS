import { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { PageModalContainer } from '../../../components/containers/PageModalContainer'
import { ScrollContainer } from '../../../components/containers/ScrollContainer'
import { InputButton } from '../../../components/forms/InputButton'
import { InputCaseForm } from '../../../components/forms/InputCaseForm'
import { PageHeader } from '../../../components/PageHeader'
import { usePages } from '../../../hooks/usePages'
import { api } from '../../../utils/trpc'
import { splitWorkerName } from '../../../utils/stringTools'

function timeInStringToDate(hour: string) {
  const [hours, minute] = hour.split(":").map(value => Number(value));
  return new Date(0, 0, 0, hours, minute);
}

function dateInStringToDate(date: string) {
  const [day, month, year] = date.split("-").map(value => Number(value));
  return new Date(year, month - 1, day);
}

type ResponsableType = { id: number }

export function ExecuteServiceOrderForm({ id }: { id: number }) {

  const { data } = api.preventive.getServiceOrderById.useQuery({ id })
  const [rep1, setResp1] = useState<ResponsableType>()
  const [rep2, setResp2] = useState<ResponsableType>()
  const [rep3, setResp3] = useState<ResponsableType>()
  const [rep4, setResp4] = useState<ResponsableType>()

  const [date, setDate] = useState<string>()
  const [startTime, setStartTime] = useState<string>()
  const [finishTime, setFinishTime] = useState<string>()


  useEffect(() => {
    console.log(date)
    console.log(startTime)
    console.log(finishTime)
  }, [date, startTime, finishTime])



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

        <div className="flex flex-col justify-center items-center mt-[-10px]" >

          <div className="w-full grid grid-cols-3 gap-10 p-5">
            <InputCaseForm
              labelName='Data'
            >
              <input
                className='w-full bg-transparent'
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </InputCaseForm>

            <InputCaseForm
              labelName='Hora de Inicio'
            >
              <input
                className='w-full bg-transparent'
                min={0}
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
            </InputCaseForm>

            <InputCaseForm
              labelName='Hora Final'
            >
              <input
                className='w-full bg-transparent'
                min={0}
                type="time"
                value={finishTime}
                onChange={e => setFinishTime(e.target.value)}
              />
            </InputCaseForm>


          </div>

          <div className="w-full grid grid-cols-4 gap-10 p-5 mt-[-30px]">
            <WorkerInput
              labelName='Manutencista 1'
              onChange={(id) => { if (id) setResp1({ id }) }}
            />
            <WorkerInput
              labelName='Manutencista 2'
              onChange={(id) => { if (id) setResp2({ id }) }}
            />
            <WorkerInput
              labelName='Manutencista 3'
              onChange={(id) => { if (id) setResp3({ id }) }}
            />
            <WorkerInput
              labelName='Manutencista 4'
              onChange={(id) => { if (id) setResp4({ id }) }}
            />
          </div>

          <div className="w-full flex flex-col justify-center items-center" >
            <header
              className="w-full py-1 pl-1.5 font-medium text-xl"
            >Ações:</header>
            <div className="w-full h-[calc(100vh-540px)] border-b border-gray-900">
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


const WorkerInput = ({ onChange, labelName }: {
  onChange(value: number | null | undefined): void,
  labelName: string,
}) => {

  const [registration, setRegistration] = useState<number>(0)
  const worker = api.main.getWorkersByRegistration.useQuery(registration)

  return (
    <InputCaseForm
      labelName={labelName}
    >
      <input
        className='w-1/4 bg-transparent'
        type="text"
        onChange={(e) => {
          setRegistration(Number(e.target.value))
          worker.refetch()
            .then(worker => {
              onChange(worker?.data?.id)
            })
        }}
      />
      <span
        className='w-3/4 text-end text-sm'
      >{
          worker.isLoading ? 'Procurando...' :
            splitWorkerName(worker?.data?.name)
        }</span>
    </InputCaseForm>
  )
}