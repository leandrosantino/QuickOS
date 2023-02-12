
import { ReactNode, useEffect, useState } from 'react'

import { MdLibraryAdd } from 'react-icons/md'

import { ScrollContainer } from '../../components/containers/ScrollContainer'
import { InputButton } from '../../components/forms/InputButton'
import { InputSearch } from '../../components/forms/InputSearch'
import { PageHeader } from '../../components/PageHeader'
import { usePages } from '../../hooks/usePages'
import { PreventiveActionsFormRoutes } from '../../routes/preventive.routes'
import {api} from '../../utils/trpc'

export function PreventiveActions() {

  const { goToPage } = usePages()
  const [inputSearchText, setInputSearchText] = useState<string>('')
  const getActions = api.preventive.getActions.useQuery({
    description: inputSearchText
  })
  const [actions, setActions] = useState<typeof getActions.data>()

  

  useEffect(()=>{
    getActions.refetch()
    setActions(getActions?.data)
  }, [getActions])


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

        <TableRow

          istitle
          className='mt-3'
          data={{
            tag: 'Tag',
            description: 'Descição',
            frequency: 'Priodicidade',
            nature: 'Natureza',
            nextExecution: 'Próxima Execução',
            excution: 'Execução'
          }}
        />

        <div className="w-full h-[calc(100vh-230px)]">
          <ScrollContainer className="h-full" >
            {
              actions?.map((entry, index) => (
                <TableRow
                  onClick={
                    () => {
                      goToPage(
                        'Preventive.Actions.EditActions',
                        { data: entry, id: entry.id}
                      )
                    }
                  }
                  key={index}
                  data={entry}
                />
              ))
            }
          </ScrollContainer>
        </div>

      </div>

      <PreventiveActionsFormRoutes />

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
  data: any;
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
          ${data.ignore?'text-gray-500':''}
          justify-center items-center 
          ${istitle ? `` : `
            bg-gray-300
            hover:bg-gray-400 hover:cursor-pointer
          `} 
        `}
        onClick={() => onClick ? onClick() : {}}
      >
        <TableCell className='w-[12%]' >{data?.machine?.tag??data.tag} </TableCell>
        <TableCell className='w-[10%]' >{data?.nature?.name??data.nature} </TableCell>
        <TableCell className='w-[26.5%]' >{data.description} </TableCell>
        <TableCell className='w-[26.5%]' >{data.excution} </TableCell>
        <TableCell className='w-[10%]' >{data.frequency} {istitle ? '' : ' Sem'}</TableCell>
        <TableCell className='w-[15%]' >{
          istitle ? data.nextExecution :
            'Semana ' +
            data.nextExecution?.split('-W')[1]
            + ', ' +
            data.nextExecution?.split('-W')[0]
        } </TableCell>
      </div>

    </div>
  )
}