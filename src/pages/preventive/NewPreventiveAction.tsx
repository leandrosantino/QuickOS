import React from 'react'
import { InputButton } from '../../components/forms/InputButton'
import { InputSelect, Option } from '../../components/forms/InputSelect'
import { InputText } from '../../components/forms/inputText'
import { PageHeader } from '../../components/PageHeader'
import { PreventiveActions } from './PreventiveActions'

import {BiSave} from 'react-icons/bi'

export function NewPreventiveAction() {
  return (
    <PreventiveActions>
      <div
        className="
        w-[50%]  p-5
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
          >
            <Option title='M41' value='1' />
            <Option title='M42' value='2' />
            <Option title='M43' value='2' />
          </InputSelect>

          <InputSelect
            labelName='Natureza'
          >
            <Option title='Elétrica' value='1' />
            <Option title='Mecânica' value='2' />
          </InputSelect>

          <InputSelect
            labelName='Criticidade'
          >
            <Option title='Alta' value='1' />
            <Option title='Média' value='2' />
            <Option title='Baixa' value='3' />
          </InputSelect>

          <InputText
            labelName='Periodicidade'
          />

        </div>

        <div
          className="w-full mt-5"
        >
          <InputText
            labelName='Descrição'
          />
        </div>

        <div 
          className="flex flex-row justify-between items-end mt-5"
        >
          <InputText
            labelName='Próxima Execução'
            type='date'
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
