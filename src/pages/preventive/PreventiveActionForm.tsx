import React, { useState } from 'react'
import { InputButton } from '../../components/forms/InputButton'
import { InputSelect, Option } from '../../components/forms/InputSelect'
import { InputText } from '../../components/forms/inputText'
import { PageHeader } from '../../components/PageHeader'
import { PreventiveActions } from './PreventiveActions'

import {BiSave} from 'react-icons/bi'

interface PreventiveActionFormProps {
  data: ActionsType;
}

export function PreventiveActionForm({data}:PreventiveActionFormProps) {

  const [actionsFormData, setActionsFormData] = useState<ActionsType>({} as ActionsType)

  function setInputValue(propName: keyof ActionsType, value:any){
    actionsFormData[propName] = value as never
    setActionsFormData(actionsFormData)
  }

  return (
    <PreventiveActions>
      <div
        className="
        w-[50%]  p-5 pb-10
        bg-gray-200 z-50
        absolute rounded-3xl
      "
      >

        <PageHeader
          title='Nova Ação Preventiva'
        />

        <div
          className='mt-5 grid grid-cols-4 gap-5'
        >
          <InputSelect
            labelName='Tag'
            value={actionsFormData.tag}
            onChange={(e)=>setInputValue('tag', e.target.value)}
          >
            <Option title='M41' value='1' />
            <Option title='M42' value='2' />
            <Option title='M43' value='2' />
          </InputSelect>

          <InputSelect
            labelName='Natureza'
            value={actionsFormData.nature}
            onChange={(e)=>setInputValue('nature', e.target.value)}
          >
            <Option title='Elétrica' value='1' />
            <Option title='Mecânica' value='2' />
          </InputSelect>

          <InputSelect
            labelName='Criticidade'
            value={actionsFormData.criticality}
            onChange={(e)=>setInputValue('criticality', e.target.value)}
          >
            <Option title='Alta' value='1' />
            <Option title='Média' value='2' />
            <Option title='Baixa' value='3' />
          </InputSelect>

          <InputText
            labelName='Periodicidade'
            value={actionsFormData.frequency}
            onChange={(e)=>setInputValue('frequency', e.target.value)}
          />

        </div>

        <div
          className="w-full mt-5"
        >
          <InputText
            labelName='Descrição'
            value={actionsFormData.description}
            onChange={(e)=>setInputValue('description', e.target.value)}
          />
        </div>

        <div 
          className="flex flex-row justify-between items-end mt-5"
        >
          <InputText
            labelName='Próxima Execução'
            type='week'
            className='w-48'
          />

          <InputButton 
            onClick={()=>{}}
            title="Salvar"
            Icon={BiSave}
            className="bg-green-500 text-gray-100 text-lg font-medium w-28"
          />

        </div>


      </div>
    </PreventiveActions>
  )
}
