import { useState } from 'react'

import { PageHeader } from '../../components/PageHeader'

import { BiSave } from 'react-icons/bi'
import { InputButton } from '../../components/forms/InputButton';
import { InputCaseForm } from '../../components/forms/InputCaseForm';
import z, { ZodError } from 'zod';
import { PageModalContainer } from '../../components/containers/PageModalContainer';
import { usePages } from '../../hooks/usePages';

interface PreventiveActionFormProps {
  data: ActionsType;
}

export function PreventiveActionForm({ data }: PreventiveActionFormProps) {

  const tags = ['M41', 'M42', 'M25', 'M26', 'M27', 'M28']

  const [tag, setTag] = useState(data ? data?.tag : tags[0])
  const [nature, setNature] = useState(data ? data?.nature : 'Elétrica')
  const [frequency, setFrequency] = useState(data ? data?.frequency : 1)
  const [nextExecution, setNextExecution] = useState(data ? data?.nextExecution : '')
  const [description, setDescription] = useState(data ? data?.description : '')

  function handleSubmit() {
    const actionData: ActionsType = { tag, nature, frequency, nextExecution, description }
    const validateSchema = z
      .object({
        tag: z.string(),
        nature: z.string(),

        frequency: z.string()
          .min(1, 'A a quantidade de semanas não pode ser menor que 1 !!')
          .transform((val) => Number(val)),

        nextExecution: z.string()
          .regex(/\d{4}-W\d{2}/, 'A semana selecionada é inválida !!'),

        description: z.string()
          .min(10, 'A descrição tem que ter no mínimo 10 caracteres !!')
      })

    let actionInfo

    try {
      actionInfo = validateSchema.parse(actionData)
    } catch (error) {
      const err = error as ZodError
      console.log(err.errors.map((entry, index) => entry.message))
      return
    }
    console.log(actionInfo)
  }

  const { goToPage } = usePages()

  return (
    <PageModalContainer
      onClick={()=>goToPage('Preventive.Actions', {})}
      width="57%"
      height="55%"
    >
      <div
        className="
          w-full h-full p-5 pb-10
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
              COD: {data?.id}
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
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            >
              {
                tags.map((entry, index) => (
                  <option key={index} value={entry}> {entry} </option>
                ))
              }
            </select>
          </InputCaseForm>

          <InputCaseForm
            labelName='Natureza'
          >
            <select
              value={nature}
              onChange={(e) => setNature(e.target.value)}
              className={`
                w-full h-full p-[2px]
                bg-transparent
              `}
            >
              <option value="Elétrica" > Elétrica </option>
              <option value="Mecânica" selected > Mecânica </option>
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
          className="flex flex-row justify-end items-end mt-5"
        >
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
