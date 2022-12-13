
import { MdLibraryAdd } from 'react-icons/md'
import { ScrollContainer } from '../../components/containers/ScrollContainer'
import { FilterFrame } from '../../components/dashboard/FilterFrame'
import { InputSearch } from '../../components/forms/InputSearch'
import { PageHeader } from '../../components/PageHeader'
import { usePages } from '../../hooks/usePages'

interface PreventiveActionsProps {
  showCreationForm?: boolean;
}


const data:AcctionsType[] = [
  {
    tag: 'M25',
    description: 'Troca do Relé',
    frequency: 15,
    nature: 'Elétrica',
    nextExecution: '21/02/2022'
  },
]

export function PreventiveActions({ showCreationForm }: PreventiveActionsProps) {

  const { goToPage } = usePages()

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

          <InputSearch />

        </PageHeader>

        <div
          className="w-full mt-3 flex justify-center items-center"
        >
          <FilterFrame width={70} opened />
        </div>

        <div className="w-full h-[calc(100vh-185px)]">
          <ScrollContainer className="mt-3 h-full  rounded-md" >
            {
              
            }
          </ScrollContainer>
        </div>

      </div>

      {
        showCreationForm &&
        <>
          <div
            className="
              md:w-[82%] sm:w-[81%] xl:w-[84.2%] h-tabPage
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
