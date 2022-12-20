import { useState } from 'react'

import { PageHeader } from '../../components/PageHeader'
import { PreventiveActions } from './PreventiveActions'

import { BiSave } from 'react-icons/bi'
import { InputButton } from '../../components/forms/InputButton';
import { InputCaseForm } from '../../components/forms/InputCaseForm';
import z from 'zod';

interface PreventiveActionFormProps {
  data: ActionsType;
}

export function PreventiveActionForm({ data }: PreventiveActionFormProps) {

  const [tag, setTag] = useState(data?.tag)
  const [nature, setNature] = useState(data?.nature)
  const [frequency, setFrequency] = useState(data?.frequency)
  const [nextExecution, setNextExecution] = useState(data?.nextExecution)
  const [description, setDescription] = useState(data?.description)

  const tags = ['M41', 'M42', 'M25', 'M26', 'M27', 'M28']

  function handleSubmit() {
    const actionData:ActionsType = {tag, nature, frequency, nextExecution, description}
    const validateSchema = z
      .object({
        tag: z.string(),
        nature: z.string(),
        frequency: z.number().min(1),
        nextExecution: z.string().regex(/\d{4}-W\d{2}/, 'Formato da semana fora do padrão !!'),
        description: z.string()
      })

    try{
      const datateste = validateSchema.parse(actionData)
      console.log(datateste)
    }catch(error){
      console.log(error)
    }
  }


  return (
    <PreventiveActions>
      <div
        className="
          w-[55%] h-[50%] p-5 pb-10
          bg-gray-200 z-50
          absolute rounded-3xl
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

          <input type="text" name="" id="" />

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
                    <option key={index} value={entry} > {entry} </option>
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
                <option value="Mecânica" > Mecânica </option>
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

    </PreventiveActions >
  )
}
