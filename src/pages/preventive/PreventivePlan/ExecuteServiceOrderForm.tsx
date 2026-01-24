import { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { PageModalContainer } from '../../../components/containers/PageModalContainer'
import { ScrollContainer } from '../../../components/containers/ScrollContainer'
import { InputButton } from '../../../components/forms/InputButton'
import { InputCaseForm } from '../../../components/forms/InputCaseForm'
import { PageHeader } from '../../../components/PageHeader'
import { useDialog } from '../../../hooks/useDialog'
import { usePages } from '../../../hooks/usePages'
import { api, fetch } from '../../../utils/trpc'
import { splitWorkerName } from '../../../utils/stringTools'
import {
  ExecutePreventiveServiceOrderType,
  executePreventiveServiceOrderSchema,
  updatePreventiveServiceOrderSchema,
} from '../../../utils/schemas'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'
import { differenceInMinutes, format } from 'date-fns'
import { ServiceOrdersType } from '@schemas/preventive'


function timeInStringToDate(hour: string | undefined) {
  if (hour) {
    const [hours, minute] = hour.split(":").map(value => Number(value));
    return new Date(0, 0, 0, hours, minute + 1)
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
  // const { data: serviceOrder, ...serviceOrderQuery } = api.preventive.getServiceOrderById.useQuery({ id })
  const [serviceOrder, setServiceOrder] = useState<ServiceOrdersType>()
  const executeServiceOrder = api.preventive.executeServiceOrders.useMutation()
  const updateServiceOrder = api.preventive.updateServiceOrder.useMutation()

  const [rep1, setResp1] = useState<ResponsableType>({ id: -1 })
  const [rep2, setResp2] = useState<ResponsableType>({ id: -1 })
  const [rep3, setResp3] = useState<ResponsableType>({ id: -1 })
  const [rep4, setResp4] = useState<ResponsableType>({ id: -1 })

  const [date, setDate] = useState<string>()
  const [startTime, setStartTime] = useState<string>('')
  const [finishTime, setFinishTime] = useState<string>('')

  const [duration, setDuration] = useState(0)

  useEffect(() => {

    if (startTime !== '' && finishTime !== '') {
      setDuration(differenceInMinutes(
        timeInStringToDate(finishTime) as Date,
        timeInStringToDate(startTime) as Date
      ))
    }

  }, [startTime, finishTime])

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch.preventive.getServiceOrderById.query({ id })
        console.log(data)
        setServiceOrder(data as any)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [id])

  useEffect(() => {
    if(!serviceOrder) return

    setDate(serviceOrder.date ? format(new Date(serviceOrder?.date), "yyyy-MM-dd" ) : '')
    setStartTime(serviceOrder.startTime ? new Date(serviceOrder.startTime).toLocaleTimeString('pt-br', {
      hour: '2-digit',
      minute: '2-digit'
    }) : '')
    setFinishTime(serviceOrder.finishTime ? new Date(serviceOrder.finishTime).toLocaleTimeString('pt-br', {
      hour: '2-digit',
      minute: '2-digit'
    }) : '')
    serviceOrder?.duration && setDuration(serviceOrder.duration)

    if(!serviceOrder.responsible || serviceOrder.responsible.length < 0) return

    setResp1({id: serviceOrder.responsible[0]?serviceOrder.responsible[0].id:-1})
    setResp2({id: serviceOrder.responsible[1]?serviceOrder.responsible[1].id:-1})
    setResp3({id: serviceOrder.responsible[2]?serviceOrder.responsible[2].id:-1})
    setResp4({id: serviceOrder.responsible[3]?serviceOrder.responsible[3].id:-1})

  }, [serviceOrder, id])

  function handleUpdate(){
    const executeServiceOrderData = {
      date: dateInStringToDate(date),
      finishTime: timeInStringToDate(finishTime),
      startTime: timeInStringToDate(startTime),
      workers: [rep1, rep2, rep3, rep4].filter(({id}) => id > 0)
    } as Omit<ExecutePreventiveServiceOrderType, 'id'>

    console.log(executeServiceOrderData)

    try {
      const executeServiceOrderInfo = updatePreventiveServiceOrderSchema
        .parse(executeServiceOrderData)

      dialogQuestion('Atenção!', 'Realmente deseja salvar as alterações?',
        () => {
          toast.promise(new Promise((resolve, reject) => {
            updateServiceOrder.mutateAsync({
              id,
              data: executeServiceOrderInfo
            })
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
      console.log(error)
      return
    }
  }

  function handleSubmit() {
    const executeServiceOrderData = {
      id: serviceOrder?.id,
      date: dateInStringToDate(date),
      finishTime: timeInStringToDate(finishTime),
      startTime: timeInStringToDate(startTime),
      workers: refineResponsableList([rep1, rep2, rep3, rep4])
    } as ExecutePreventiveServiceOrderType

    // console.log(executeServiceOrderData)

    try {
      const executeServiceOrderInfo = executePreventiveServiceOrderSchema
        .parse(executeServiceOrderData)

      dialogQuestion('Atenção!', 'Realmente deseja execultar es Ordem de Serviço',
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

  function getRegistration(index:number){
    //serviceOrder?.responsible ? serviceOrder.responsible[0].registration.toString() : ''
    if(serviceOrder?.responsible && index in serviceOrder.responsible){
      return serviceOrder.responsible[index].registration.toString()
    }
    return ''
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
            {serviceOrder?.machine?.tag} - {serviceOrder?.nature?.name} / Nº {serviceOrder?.id}
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
              value={getRegistration(0)}
              onChange={(id) => setResp1(id ? { id } : { id: -1 })}
              // disabled={serviceOrder?.concluded ? true : false}
            />
            <WorkerInput
              labelName='Manutencista 2'
              value={getRegistration(1)}
              onChange={(id) => setResp2(id ? { id } : { id: -1 })}
              // disabled={serviceOrder?.concluded ? true : false}
            />
            <WorkerInput
              labelName='Manutencista 3'
              value={getRegistration(2)}
              onChange={(id) => setResp3(id ? { id } : { id: -1 })}
              // disabled={serviceOrder?.concluded ? true : false}
            />
            <WorkerInput
              labelName='Manutencista 4'
              value={getRegistration(3)}
              onChange={(id) => setResp4(id ? { id } : { id: -1 })}
              // disabled={serviceOrder?.concluded ? true : false}
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
                  {serviceOrder?.actionsTaken?.map((entry) => (
                    <li
                      key={entry.id}
                      className="py-0.5"
                    >
                      Nº {entry.id} - {entry.action.excution}, {entry.action.description}
                    </li>
                  ))}
                  {serviceOrder?.actions?.map((entry) => (
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

          <div className="w-full p-5 flex flex-row justify-between items-center" >

            <div className='text-lg'>
              <span className='font-medium' >Duração:</span> {duration}min
            </div>

            <InputButton
              onClick={() => {
                serviceOrder?.concluded ? handleUpdate() : handleSubmit()
              }}
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


const WorkerInput = ({ onChange, labelName, value = '', disabled = false}: {
  onChange(value: number | null | undefined): void,
  labelName: string, disabled?: boolean, value?: string
}) => {

  const [registration, setRegistration] = useState<string>('')
  const worker = api.main.getWorkersByRegistration
    .useQuery(Number(registration === '' ? -1 : registration))

  useEffect(() => {
    console.log(value)
    setRegistration(value)
  }, [value])

  return (
    <InputCaseForm
      labelName={labelName}
    >
      <input
        className='w-1/4 bg-transparent'
        type="text"
        disabled={disabled}
        onChange={(e) => {
          setRegistration(e.target.value)
          worker.refetch()
            .then(worker => {
              onChange(worker?.data?.id)
            })
        }}
        value={registration}
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
