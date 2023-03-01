import { ReactNode, useEffect, useRef, useState } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import { RiFilterFill, RiFilterOffFill } from 'react-icons/ri'
import { ScrollContainer } from '../../components/containers/ScrollContainer'
import { CheckBox } from '../../components/forms/CheckBox'
import { InputButton } from '../../components/forms/InputButton'
import { InputSearch } from '../../components/forms/InputSearch'
import { PageHeader } from '../../components/PageHeader'
import { usePages } from '../../hooks/usePages'
import { PreventiveActionsFormRoutes } from '../../routes/preventive.routes'
import { api, fetch } from '../../utils/trpc'
import { ActionsInfoType } from '../../utils/schemas'


export function PreventiveActions() {

  const { goToPage } = usePages()

  // Filters

  const machines = api.main.getMachines.useQuery()
  const natures = api.main.getNatures.useQuery()

  const [nature, setNature] = useState(-1)
  const [machine, setMachine] = useState(-1)
  const [weekCode, setWeekCode] = useState<string>('')
  const [showIgnore, setShowIgnore] = useState(false)
  const [inputSearchText, setInputSearchText] = useState<string>('')
  const [filtered, setFiltered] = useState<boolean>(false)
  useEffect(() => {
    setFiltered(nature !== -1 || machine !== -1 || weekCode !== '')
  }, [nature, machine, weekCode])

  // Data

  const [actions, setActions] = useState<ActionsInfoType[]>()

  const cursor = useRef<number>(1)

  useEffect(() => {
    if (actions) {
      const lastAction = actions[actions?.length - 1]?.id
      if (lastAction) cursor.current = lastAction
    }
  }, [actions])


  function onUpdate() {
    setActions([])
    cursor.current = 1
    fetch.preventive.getActions.query({
      searchText: inputSearchText,
      machineId: machine,
      natureId: nature,
      weekCode,
      showIgnore,
      limit: 30,
      cursor: cursor.current
    })
      .then(data => {
        setActions(state => [...state ? state : [], ...data])
      })
  }

  useEffect(() => {
    setActions([])
    cursor.current = 1
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        fetch.preventive.getActions.query({
          searchText: inputSearchText,
          machineId: machine,
          natureId: nature,
          weekCode,
          showIgnore,
          limit: 30,
          cursor: cursor.current
        })
          .then(data => {
            setActions(state => [...state ? state : [], ...data])
          })
      }
    })
    const sentinel = document.querySelector('#sentinel')
    sentinel && intersectionObserver.observe(sentinel)
    return () => intersectionObserver.disconnect()
  }, [
    nature,
    machine,
    weekCode,
    showIgnore,
    inputSearchText,
  ])


  return (
    <>
      <div
        className="
          w-full h-[100%]
          px-5
        "
      >
        <PageHeader title='Ações Preventivas'>
          <>
            {/* {cursor} */}
            <InputButton
              Icon={MdLibraryAdd}
              onClick={() => { goToPage('Preventive.Actions.NewActions', {}) }}
              title='Criar'
              className="bg-green-500 text-gray-100 mr-2"
            />
          </>
        </PageHeader>

        <div
          className={`w-full h-16 flex flex-row gap-1 justify-end, items-center`}
        >

          <CheckBox
            title='Mostar Desativados'
            checked={showIgnore}
            onChange={setShowIgnore}
            fontSize={12}
          />

          <div
            className='w-1/4 h-full flex flex-col p-1.5'
          >
            <label
              className="w-full h-1/3 font-medium text-gray-900 indent-0"
            >Próxima Execução:</label>
            <input
              className='w-full h-2/3 bg-transparent border-b border-gray-900 py-1'
              type={'week'}
              value={weekCode}
              onChange={(e) => setWeekCode(e.target.value)}
            />
          </div>

          <div
            className='w-1/4 h-full flex flex-col p-1.5'
          >
            <label
              className="w-full h-1/3 font-medium text-gray-900 indent-0"
            >Máquina:</label>
            <select
              className='w-full h-2/3 bg-transparent border-b border-gray-900 py-1'
              value={machine}
              onChange={(e) => setMachine(Number(e.target.value))}
            >
              <option value="-1">Todos</option>
              {machines.data?.map((entry, index) => (
                <option key={index} value={entry.id}>{entry.tag}</option>
              ))}
            </select>
          </div>

          <div
            className='w-1/4 h-full flex flex-col p-1.5'
          >
            <label
              className="w-full h-1/3 font-medium text-gray-900 indent-0"
            >Natureza:</label>
            <select
              className='w-full h-2/3 bg-transparent border-b border-gray-900 py-1'
              value={nature}
              onChange={(e) => setNature((Number(e.target.value)))}
            >
              <option value="-1">Todos</option>
              {natures.data?.map((entry, index) => (
                <option key={index} value={entry.id}>{entry.name}</option>
              ))}
            </select>
          </div>

          <div
            className='w-12 h-full flex flex-col p-1.5 justify-center items-end'
          >
            <InputButton
              Icon={
                filtered ? RiFilterOffFill : RiFilterFill
              }
              className={`
                w-full text-xl
                ${filtered ?
                  'hover:text-red-400 text-red-500' :
                  'text-gray-300'
                }
              `}
              onClick={() => {
                setNature(-1)
                setMachine(-1)
                setWeekCode('')
              }}
            />
          </div>

          <div
            className='w-1/4 h-full flex flex-col justify-center items-center p-1.5'
          >
            <InputSearch returnSearchText={(value: string) => setInputSearchText(value)} />
          </div>

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
            excution: 'Execução'
          }}
        />

        <div className="w-full h-[calc(100vh-230px)]">
          <ScrollContainer className="h-full" >
            {
              /*getActions.isLoading*/ false ? <div className="
                w-full h-full
                flex justify-center items-center
                font-medium
              " >Carregando....</div> :

                actions?.map((entry, index) => (
                  <TableRow
                    onClick={
                      () => {
                        goToPage(
                          'Preventive.Actions.EditActions',
                          { data: entry, id: entry.id }
                        )
                      }
                    }
                    key={index}
                    data={entry}
                  />
                ))
            }
            <div
              id='sentinel'
              className='w-full h-[1px] bg-transparent'
            ></div>
          </ScrollContainer>
        </div>

      </div>

      <PreventiveActionsFormRoutes onBack={() => { onUpdate() }} />

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

const TableRow = ({ data, className, istitle, onClick }: TableRowProps) => {

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
          ${data.ignore ? 'text-gray-500' : ''}
          justify-center items-center
          ${istitle ? `` : `
            bg-gray-300
            hover:bg-gray-400 hover:cursor-pointer
          `}
          `}
        onClick={() => onClick ? onClick() : {}}
      >
        <TableCell className='w-[12%]' >{data?.machine?.tag ?? data.tag} </TableCell>
        <TableCell className='w-[10%]' >{data?.nature?.name ?? data.nature} </TableCell>
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