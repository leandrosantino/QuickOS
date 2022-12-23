
import { ReactNode, useEffect, useState } from 'react'

import { MdLibraryAdd } from 'react-icons/md'
import { RiDeleteBack2Fill } from 'react-icons/ri'


import { ScrollContainer } from '../../components/containers/ScrollContainer'
import { FilterFrame } from '../../components/dashboard/FilterFrame'
import { InputButton } from '../../components/forms/InputButton'
import { InputSearch } from '../../components/forms/InputSearch'
import { PageHeader } from '../../components/PageHeader'
import { usePages } from '../../hooks/usePages'
import { PreventiveModalRoutes } from '../../routes/preventive.routes'

const data: ActionsType[] = [
  {
    id: 1,
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: '1',
    nature: 'Elétrica',
    nextExecution: '2022-W45',
  },
  {
    id: 2,
    tag: 'M26',
    description: 'Troca do Relé termico de do motor da bomba de poliol',
    frequency: '3',
    nature: 'Mecânica',
    nextExecution: '2022-W44',
  },
  {
    id: 3,
    tag: 'M27',
    description: 'Troca do Relé termico de do motor da bomba de desmoldante',
    frequency: '4',
    nature: 'Elétrica',
    nextExecution: '2022-W46',
  },
  {
    id: 4,
    tag: 'M28',
    description: 'Troca do Relé termico de do motor da bomba de água',
    frequency: '12',
    nature: 'Mecânica',
    nextExecution: '2022-W52',
  },
]

export function PreventiveActions() {

  const { goToPage } = usePages()
  // eslint-disable-next-line
  const [inputSearchText, setInputSearchText] = useState<string>('')

  const [actions, setActions] = useState<ActionsType[]>(data)

  useEffect(() => {
    const filterActions: ActionsType[] = []

    data.forEach(entry => {
      if (
        entry.description.toUpperCase()
          .search(inputSearchText.toUpperCase()) > -1 ||
        inputSearchText === ''
      ) {
        filterActions.push(entry)
      }
    })

    setActions(filterActions)
  }, [inputSearchText])

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
            onClick={() => { goToPage('Preventive.Actions.NewActions', {}) }}
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
          }}
        />

        <div className="w-full h-[calc(100vh-230px)]">
          <ScrollContainer className="h-full" >
            {
              actions.map((entry, index) => (
                <TableRow onClick={() => goToPage('Preventive.Actions.EditActions', { data: entry })} key={index} data={entry} />
              ))
            }
          </ScrollContainer>
        </div>

      </div>

      <PreventiveModalRoutes />
      
    </>
  )
}

function TableCell({ children, className }:
  {
    className: string;
    children: ReactNode;
    onClick?: () => void
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
  data: ActionsType;
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
        w-full
        flex flex-row 
        justify-center items-center
        border-b border-gray-900 
      ` + className}
    >

      <div
        className={`
          w-[100%]
          flex flex-row 
          justify-center items-center 
          ${istitle ? `` : `
            bg-gray-300
            hover:bg-gray-400 hover:cursor-pointer
          `} 
        `}
        onClick={() => onClick ? onClick() : {}}
      >
        <TableCell className='w-[12%]' >{data.tag} </TableCell>
        <TableCell className='w-[10%]' >{data.nature} </TableCell>
        <TableCell className='w-[53%]' >{data.description} </TableCell>
        <TableCell className='w-[10%]' >{data.frequency} {istitle ? '' : ' Sem'}</TableCell>
        <TableCell className='w-[15%]' >{
          istitle ? data.nextExecution :
            'Semana ' +
            data.nextExecution?.split('-W')[1]
            + ', ' +
            data.nextExecution?.split('-W')[0]
        } </TableCell>
      </div>

      {/* <TableCell className='w-[5%]' >

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
                onClick={() => { }}
                className='text-gray-100 bg-red-500 text-xl w-10'
                Icon={RiDeleteBack2Fill}
              />
            </div>
        }

      </TableCell> */}

    </div>
  )
}