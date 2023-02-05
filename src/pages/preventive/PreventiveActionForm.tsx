import { useEffect, useState } from 'react'

import { PageHeader } from '../../components/PageHeader'

import { BiSave } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'

import { InputButton } from '../../components/forms/InputButton';
import { InputCaseForm } from '../../components/forms/InputCaseForm';
import { ZodError } from 'zod';
import { PageModalContainer } from '../../components/containers/PageModalContainer';
import { usePages } from '../../hooks/usePages';
import { useDialog } from '../../hooks/useDialog';

import { toast } from 'react-toastify'

import { api } from '../../utils/trpc'

import { ActionsInfoType, ActionsInfoTypeInupt, actionInfoSchema, MachineInfoType, NatureInfoType } from '../../utils/schemas'

interface PreventiveActionFormProps {
  id?: number;
  data?: ActionsInfoType;
}

export function PreventiveActionForm({ id, data }: PreventiveActionFormProps) {

  const [machines, setMachines] = useState<MachineInfoType[]>([{} as MachineInfoType])
  const [natures, setNatures] = useState<NatureInfoType[]>([{} as NatureInfoType])
  const getMachine = api.main.getMachines.useQuery()
  const getNature = api.main.getNatures.useQuery()

  const saveAction = api.preventive.createAction.useMutation()
  const updateAction = api.preventive.updateAction.useMutation()
  const deleteAction = api.preventive.deleteAction.useMutation()

  useEffect(() => {
    setNatures(getNature.data ? getNature.data : [{} as NatureInfoType])
    // eslint-disable-next-line
  }, [getNature])

  useEffect(() => {
    setMachines(getMachine.data ? getMachine.data : [{} as MachineInfoType])
    // eslint-disable-next-line
  }, [getMachine])

  const [machineId, setMachineId] = useState(data ? data?.machineId : 1)
  const [natureId, setNatureId] = useState(data ? data?.natureId : 1)
  const [frequency, setFrequency] = useState(data ? String(data?.frequency) : '1')
  const [nextExecution, setNextExecution] = useState(data ? data?.nextExecution : '')
  const [description, setDescription] = useState(data ? data?.description : '')
  // eslint-disable-next-line
  const [excution, setExecution] = useState(data ? data?.excution : '')

  const { dialogQuestion } = useDialog()
  const { backPage } = usePages()

  function clearInputs() {
    setMachineId(1)
    setNatureId(1)
    setFrequency('1')
    setNextExecution('')
    setDescription('')
  }

  function handleActionCreate(actionInfo: ActionsInfoType) {
    return new Promise((resolve, reject) => {
      saveAction.mutateAsync(actionInfo)
        .then(resp => {
          resolve(resp)
          clearInputs()
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  function handleActionUpdate(actionInfo: ActionsInfoType) {
    return new Promise((resolve, reject) => {
      updateAction.mutateAsync({ data: actionInfo, id: id ?? 0 })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  function handleDelete() {
    try {
      dialogQuestion('Atenção!', 'Realmente Deseja excluir está ação?',
        () => {
          toast.promise(()=>new Promise((resolve, reject)=>{
            deleteAction.mutateAsync({id: id??0})
            .then(resp=>{
              resolve(resp)
              backPage()
            })
            .catch(err=>{
              reject(err)
            })
          }), {
            pending: 'Processando as informações...',
            error: {
              render({ data }) {
                return `Error ${data}`
              }
            },
            success: 'Alteração realizada com sucesso!!'
          })
        },
        () => {}
      )
    } catch (error) {
      toast.error('Erro ao excluir Acão!!', { toastId: String(error) })
      return
    }
  }

  function handleSubmit() {
    const actionData: ActionsInfoTypeInupt = {
      machineId, natureId, frequency,
      nextExecution, description, excution
    }

    try {
      const actionInfo = actionInfoSchema.parse(actionData)
      dialogQuestion('Atenção!', 'Realmente deseja salvar as alterações??',
        () => {
          toast.promise(() => {
            return id ?
              handleActionUpdate(actionInfo) :
              handleActionCreate(actionInfo)
          }, {
            pending: 'Processando as informações...',
            error: {
              render({ data }) {
                return `Error ${data}`
              }
            },
            success: 'Alteração realizada com sucesso!!'
          })

        },
        () => {
          console.log('Cancelado!')
        }
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

        <PageHeader
          title='Nova Ação Preventiva'
        >
          {
            data &&
            <div
              className='font-medium text-xl mr-5'
            >
              COD: {id}
            </div>
          }
        </PageHeader>

        <div
          className='mt-5 grid grid-cols-4 gap-5'
        >

          <InputCaseForm
            labelName='Tag'
          >
            <select
              value={machineId}
              onChange={(e) => setMachineId(Number(e.target.value))}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            >
              {
                machines.map((entry, index) => (
                  <option key={index} value={entry.id}> {entry.tag} </option>
                ))
              }
            </select>
          </InputCaseForm>

          <InputCaseForm
            labelName='Natureza'
          >
            <select
              value={natureId}
              onChange={(e) => setNatureId(Number(e.target.value))}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            >
              {natures.map((entry, index) =>
                <option key={index} value={entry.id}> {entry.name} </option>
              )}

            </select>
          </InputCaseForm>

          <InputCaseForm
            labelName='Periodicidade'
          >
            <input
              value={frequency}
              type="number"
              min={1}
              onChange={(e) => setFrequency(e.target.value)}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            />
            Sem
          </InputCaseForm>

          <InputCaseForm
            labelName='Próx.Execução'
          >
            <input
              value={nextExecution}
              type='week'
              onChange={(e) => setNextExecution(e.target.value)}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            />
          </InputCaseForm>


        </div>

        <div
          className="w-full mt-5"
        >
          <InputCaseForm
            labelName='Descrição'
          >
            <input
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            />
          </InputCaseForm>
        </div>

        <div
          className="w-full mt-5"
        >
          <InputCaseForm
            labelName='Execução'
          >
            <input
              value={excution}
              type="text"
              onChange={(e) => setExecution(e.target.value)}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            />
          </InputCaseForm>
        </div>

        <div
          className={`
            flex flex-row items-end mt-7
            ${id ? 'justify-between' : 'justify-end'}
          `}
        >
          {id &&
            <InputButton
              onClick={() => handleDelete()}
              title='Excluir'
              Icon={MdDeleteOutline}
              className="text-red-500"
            />
          }

          <InputButton
            onClick={handleSubmit}
            title='Salvar'
            Icon={BiSave}
            className="bg-green-500 text-gray-100"
          />
        </div>

      </div>

    </PageModalContainer >
  )
}
