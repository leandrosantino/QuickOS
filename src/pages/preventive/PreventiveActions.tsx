
import { ReactNode, useState } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import { ScrollContainer } from '../../components/containers/ScrollContainer'
import { FilterFrame } from '../../components/dashboard/FilterFrame'
import { InputSearch } from '../../components/forms/InputSearch'
import { PageHeader } from '../../components/PageHeader'
import { usePages } from '../../hooks/usePages'

interface PreventiveActionsProps {
  showCreationForm?: boolean;
}

const data: AcctionsType[] = [
  {
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: 15,
    nature: 'Elétrica',
    nextExecution: '21/02/2022'
  },
  {
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: 15,
    nature: 'Elétrica',
    nextExecution: '21/02/2022'
  },
  {
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: 15,
    nature: 'Elétrica',
    nextExecution: '21/02/2022'
  },
  {
    tag: 'M25',
    description: 'Troca do Relé termico de do motor da bomba de iso',
    frequency: 15,
    nature: 'Elétrica',
    nextExecution: '21/02/2022'
  },
]

function TableCell({ children, width }: { width: number; children: ReactNode }) {
  return (
    <div
      className={`
        w-[${width}%] h-full 
        flex flex-row justify-center items-center
      `}
    >
      {children}
    </div>
  )
}

function TableRow({ data, className, istitle }: { data: AcctionsType; className?: string, istitle?: boolean}) {
  return (
    <div
      className={`w-full p-2 flex flex-row justify-center items-center border-b border-gray-900 ` + className}
    >
      <TableCell width={15} >{data.tag} </TableCell>
      <TableCell width={15} >{data.nature} </TableCell>
      <TableCell width={30} >{data.description} </TableCell>
      <TableCell width={15} >{data.frequency} </TableCell>
      <TableCell width={15} >{data.nextExecution} </TableCell>
      <TableCell width={10} >  
        {
          istitle?
          <div className='w-full h-full' >
              teste
          </div>:
          <div className='w-full h-full' >
            tetet
          </div>
        }
      </TableCell>
    </div>
  )
}

export function PreventiveActions({ showCreationForm }: PreventiveActionsProps) {

  const { goToPage } = usePages()

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
          <button
            onClick={() => { goToPage('Preventive.Actions.NewActions', {}) }}
            className="
              py-1 px-1.5 bg-green-500 text-gray-100 mr-2
              flex justify-center items-center rounded-lg
            "
          >
            Criar
            <span className="ml-2" >
              <MdLibraryAdd width={20} />
            </span>
          </button>

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
            nextExecution: 'Próxima Execução'
          }}
        />

        <div className="w-full h-[calc(100vh-230px)]">
          <ScrollContainer className="h-full" >
            {
              data.map((entry, index) => (
                <TableRow key={index} data={entry} />
              ))
            }
          </ScrollContainer>
        </div>

      </div>

      {
        showCreationForm &&
        <>
          <div
            className="
              w-[81%] xl:w-[84.2%] h-tabPage
              flex flex-row justify-center items-center
              bg-gray-900 bg-opacity-50 
              absolute
            "
            onClick={() => goToPage('Preventive.Actions', {})}
          ></div>
          <div
            className="
              w-[50%] h-[70%] 
              bg-gray-200 z-10
              absolute rounded-3xl
            "
          >
            <button>Ggge</button>
          </div>
        </>
      }
    </>
  )
}
