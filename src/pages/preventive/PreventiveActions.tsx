
import { ReactNode, useState } from 'react'

import { MdLibraryAdd } from 'react-icons/md'
import { RiDeleteBack2Fill } from 'react-icons/ri'


import { ModalContainer } from '../../components/containers/ModalContainer'
import { ScrollContainer } from '../../components/containers/ScrollContainer'
import { FilterFrame } from '../../components/dashboard/FilterFrame'
import { InputButton } from '../../components/forms/InputButton'
import { InputSearch } from '../../components/forms/InputSearch'
import { PageHeader } from '../../components/PageHeader'
import { usePages } from '../../hooks/usePages'

interface PreventiveActionsProps {
  children?: ReactNode;
}

const data: AcctionsType[] = [
  {
    id: 1,
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: '15 dias',
    nature: 'Elétrica',
    nextExecution: '21/02/2022',
    criticality: 'Alta'
  },
  {
    id: 2,
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: '15 dias',
    nature: 'Elétrica',
    nextExecution: '21/02/2022',
    criticality: 'Alta'
  },
  {
    id: 3,
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: '15 dias',
    nature: 'Elétrica',
    nextExecution: '21/02/2022',
    criticality: 'Alta'
  },
  {
    id: 4,
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: '15 dias',
    nature: 'Elétrica',
    nextExecution: '21/02/2022',
    criticality: 'Alta'
  },
]

function TableCell({ children, className }: 
  { 
    className: string; 
    children: ReactNode;
    onClick?: ()=>void
  }) {
  return (
    <div
      className={`
         p-1 flex flex-row justify-center items-center
      ` + className}
    >
      {children}
    </div>
  )
}

interface TableRowProps {
  data: AcctionsType;
  className?: string,
  istitle?: boolean
  onClick?: () => void
}

function TableRow({ data, className, istitle, onClick }: TableRowProps) {
  return (
    <div
      className={`
        ${istitle ? `
          bg-gray-700 text-gray-100 font-medium 
          rounded-tr-lg rounded-tl-lg text-sm
        `: `bg-gray-300`}
        w-full pl-1
        flex flex-row 
        justify-center items-center
        border-b border-gray-900 
      ` + className}
    >

      <div 
        className={`
          w-[95%] rounded-md
          flex flex-row 
          justify-center items-center 
          ${istitle?``:`
            bg-gray-300
            hover:bg-gray-400 hover:cursor-pointer
          `} 
        `}
        onClick={() => onClick ? onClick() : {}}
      >
        <TableCell className='w-[12%]' >{data.tag} </TableCell>
        <TableCell className='w-[10%]' >{data.nature} </TableCell>
        <TableCell className='w-[42%]' >{data.description} </TableCell>
        <TableCell className='w-[10%]' >{data.criticality} </TableCell>
        <TableCell className='w-[13%]' >{data.frequency} </TableCell>
        <TableCell className='w-[13%]' >{data.nextExecution} </TableCell>
      </div>

        <TableCell className='w-[5%]' >

        {
          istitle ? 
            <div className='w-full h-full'></div> :
            <div
              className='
                w-full h-full 
                flex flex-row justify-center items-center
              '
            >
              <InputButton
                onClick={()=>{}}
                className='text-gray-100 bg-red-500 text-xl w-10'
                Icon={RiDeleteBack2Fill}
              />
            </div>
        }

      </TableCell>
    </div>
  )
}

export function PreventiveActions({ children }: PreventiveActionsProps) {

  const { goToPage, sideMenuIsReduce } = usePages()
  // eslint-disable-next-line
  const [inputSearchText, setInputSearchText] = useState<string>('')


  return (
    <>
      <div
        className="
          w-full h-[100%]
          px-5
        "
      >
        <PageHeader title='Ações Preventivas'>
          <InputButton 
            Icon={MdLibraryAdd}  
            onClick={() => { goToPage('Preventive.Actions.NewActions', {})}}
            title='Criar'
            className="bg-green-500 text-gray-100 mr-2"
          />
          <InputSearch returnSearchText={(value: string) => setInputSearchText(value)} />

        </PageHeader>

        <div
          className="w-full mt-3 flex justify-center items-center"
        >
          <FilterFrame width={70} opened />
        </div>

        <TableRow

          istitle
          className='mt-3'
          data={{
            tag: 'Tag',
            description: 'Descição',
            frequency: 'Priodicidade',
            nature: 'Natureza',
            nextExecution: 'Próxima Execução',
            criticality: 'Criticidade'
          }}
        />

        <div className="w-full h-[calc(100vh-230px)]">
          <ScrollContainer className="h-full" >
            {
              data.map((entry, index) => (
                <TableRow onClick={() => goToPage('Preventive.Actions.EditActions', {data: entry})} key={index} data={entry} />
              ))
            }
          </ScrollContainer>
        </div>

      </div>

      {
        children &&
        <ModalContainer>
          {children}
        </ModalContainer>
      }
    </>
  )
}
