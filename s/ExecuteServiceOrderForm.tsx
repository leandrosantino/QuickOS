import { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { PageModalContainer } from '../../../components/containers/PageModalContainer'
import { ScrollContainer } from '../../../components/containers/ScrollContainer'
import { InputButton } from '../../../components/forms/InputButton'
import { InputCaseForm } from '../../../components/forms/InputCaseForm'
import { PageHeader } from '../../../components/PageHeader'
import { useDialog } from '../../../hooks/useDialog'
import { usePages } from '../../../hooks/usePages'
import { api } from '../../../utils/trpc'
import { splitWorkerName } from '../../../utils/stringTools'
import {
  ExecutePreventiveServiceOrderType,
  executePreventiveServiceOrderSchema,
} from '../../../utils/schemas'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'
import { differenceInMinutes, format } from 'date-fns'


function timeInStringToDate(hour: string | undefined, date: Date) {
  if (hour) {
    const [hours, minute] = hour.split(":").map(value => Number(value));
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minute)
  } return ''
}

function dateInStringToDate(date: string | undefined) {
  if (date) {
    const [year, month , day] = date.split("-").map(value => Number(value));
    return new Date(year, month - 1, day)
  } return ''
}

function refineResponsableList(responsableList: ResponsableType[]) {
  const validResponsable: ResponsableType[] = []
  responsableList.forEach(responsable => {
    if (responsable.id >= 1) validResponsable.push(responsable)
  })
  return validResponsable
}


type ResponsableType = { id: number }

export function ExecuteServiceOrderForm({ id }: { id: number }) {
  const { backPage } = usePages()
  const { dialogQuestion } = useDialog()
  const { data } = api.preventive.getServiceOrderById.useQuery({ id })
  const executeServiceOrder = api.preventive.executeServiceOrders.useMutation()

  const [rep1, setResp1] = useState<ResponsableType>({ id: -1 })
  const [rep2, setResp2] = useState<ResponsableType>({ id: -1 })
  const [rep3, setResp3] = useState<ResponsableType>({ id: -1 })
  const [rep4, setResp4] = useState<ResponsableType>({ id: -1 })

  const [date, setDate] = useState<string>()
  const [startTime, setStartTime] = useState<string>('')
  const [finishTime, setFinishTime] = useState<string>('')

  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (data) {

      setDate(data.date ? format(new Date(data?.date), "yyyy-MM-dd" ) : '')
      setStartTime(data.startTime ? new Date(data.startTime).toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit'
      }) : '')
      setFinishTime(data.finishTime ? new Date(data.finishTime).toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit'
      }) : '')
      data?.duration && setDuration(data.duration)
      const resp = [setResp1, setResp2, setResp3, setResp4]
      data?.responsible?.forEach((entry, index) => {
        resp[index]({ id: entry.id })
      })

    }
  }, [data])

  useEffect(() => {
    // console.log(startTime, finishTime)

    const _date = dateInStringToDate(date)
    if (startTime !== '' && finishTime !== '' && _date instanceof Date) {
      setDuration(differenceInMinutes(
        timeInStringToDate(finishTime, _date) as Date,
        timeInStringToDate(startTime, _date) as Date
      ))
    }

  }, [startTime, finishTime])

  function handleSubmit() {
    console.log('submit: ', [rep1, rep2, rep3, rep4])
    const _date = dateInStringToDate(date)
    const executeServiceOrderData = {
      id: data?.id,
      date: dateInStringToDate(date),
      finishTime: timeInStringToDate(finishTime, _date as Date),
      startTime: timeInStringToDate(startTime, _date as Date),
      workers: refineResponsableList([rep1, rep2, rep3, rep4])
    } as ExecutePreventiveServiceOrderType

    console.log(executeServiceOrderData)
    // return
    try {
      const executeServiceOrderInfo = executePreventiveServiceOrderSchema
        .parse(executeServiceOrderData)

      dialogQuestion('Atenção!', data?.concluded?'Realmente deseja salvar a alteração?':'Realmente deseja execultar a Ordem de Serviço',
        () => {
          toast.promise(new Promise((resolve, reject) => {
            executeServiceOrder.mutateAsync(executeServiceOrderInfo)
              .then(resp => {
                resolve(resp)
              })
              .catch(error => {
                reject(error)
              })
          }), {
            pending: 'Processando as informações...',
            error: {
              render({ data }) {
                return `Error ${data}`
              }
            },
            success: 'Alteração realizada com sucesso!!'
          }).then(() => {
            backPage()
          })
        },
        () => { }
      )

    } catch (error) {
      const err = error as ZodError
      const msgError = err.errors.map((entry) => entry.message)[0]
      toast.error(msgError, { toastId: msgError })
      return
    }

  }

  return (
    <PageModalContainer
      onClick={() => backPage()}
      width="70%"
      height="80%"
    >

      <div
        className="
          w-full h-full p-5 pb-5
          bg-[#fff] z-50
          rounded-3xl
        "
      >

        <PageHeader title='Executar Preventiva' >
          <div className="text-lg font-medium w-full" >
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
              registration={data?.responsible?data?.responsible[0]?.registration.toString():''}
              onChange={(id) => setResp1(id ? { id } : { id: -1 })}
            />
            <WorkerInput
              labelName='Manutencista 2'
              registration={data?.responsible?data?.responsible[1]?.registration.toString():''}
              onChange={(id) => setResp2(id ? { id } : { id: -1 })}
            />
            <WorkerInput
              labelName='Manutencista 3'
              registration={data?.responsible?data?.responsible[2]?.registration.toString():''}
              onChange={(id) => setResp3(id ? { id } : { id: -1 })}
            />
            <WorkerInput
              labelName='Manutencista 4'
              registration={data?.responsible?data?.responsible[3]?.registration.toString():''}
              onChange={(id) => setResp4(id ? { id } : { id: -1 })}
            />
          </div>

          <div className="w-full flex flex-col justify-center items-center" >
            <header
              className="w-full py-1 pl-1.5 font-medium text-xl"
            >Ações:</header>
            <div className="w-full h-[calc(100vh-580px)] border-b border-gray-900">
              <ScrollContainer className="h-full px-2 py-2" >
                <div
                  className="flex flex-col w-full p-0.5 "
                >
                  {!data?.concluded ?data?.actions?.map((entry) => (
                    <li
                      key={entry.id}
                      className="py-0.5"
                    >
                      Nº {entry.id} - {entry.excution}, {entry.description}
                    </li>
                  )): data?.actionsTaken?.map((entry) => (
                    <li
                      key={entry.id}
                      className="py-0.5"
                    >
                      Nº {entry.id} - {entry.action.excution}, {entry.action.description}
                    </li>
                  ))}
                </div>
              </ScrollContainer>
            </div>
          </div>

          <div className="w-full p-5 flex flex-row justify-between items-center" >

            <div className='text-lg'>
              <span className='font-medium' >Duração:</span> {duration}min
            </div>

            <InputButton
              onClick={handleSubmit}
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


const WorkerInput = ({ onChange, labelName, registration = '' }: {
  onChange(value: number | null | undefined): void,
  labelName: string,
  registration?: string
}) => {

  const [registrationState, setRegistration] = useState<string>(registration)
  const worker = api.main.getWorkersByRegistration
    .useQuery(Number(registrationState === '' ? -1 : registrationState))

  return (
    <InputCaseForm
      labelName={labelName}
    >
      <input
        className='w-1/4 bg-transparent'
        type="text"
        onChange={(e) => {
          setRegistration(e.target.value)
          worker.refetch()
            .then(worker => {
              onChange(worker?.data?.id)
            })
        }}
        value={registrationState}
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
