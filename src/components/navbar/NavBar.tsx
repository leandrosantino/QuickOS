import { useState, useEffect } from 'react'
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
  VscMenu
} from "react-icons/vsc";

import { usePages,} from '../../hooks/usePages'
import {ipc} from '../../utils/ipc'

export function NavBar() {

  const { currentPage, sideMenuIsReduce, changeSideMenu, PageNameLink } = usePages()
  const [isMaximized, setIsMaximized] = useState<boolean>()

  useEffect(() => {
    setIsMaximized(ipc.sendSync('isMaximized'))

    ipc.on<boolean>('changeIconMaximizeButton', (event, args) => {
      setIsMaximized(args)
    })

  }, [])

  return (
    <nav className='drag h-navBar w-screen bg-gray-900 flex flex-row justify-between text-gray-300'>

      <div className=' w-1/3 h-[100%] flex justify-start'>
        <button
          className='no-drag w-[50px] hover:text-white-500 flex items-center justify-center'
          onClick={() => changeSideMenu(!sideMenuIsReduce)}
        >
          <VscMenu />
        </button>
        <header className='no-drag flex text-[10pt] justify-center items-center py-1 text-white-500'>
          <PageNameLink page={currentPage}/>
        </header>
      </div>
      
      <header className='w-1/3 flex text-[10pt] justify-center items-center py-1 text-white-500'>
        Quick OS
      </header>

      <div className='h-[100%] w-1/3 flex flex-row justify-end'>
        <button
          className='no-drag w-[46px] h-[100%] hover:bg-opacity-5 hover:bg-white-500 hover:text-white-500 items-center flex        justify-center'
          onClick={() => ipc.sendSync('minimize')}
        >
          <VscChromeMinimize />
        </button>

        <button
          className='no-drag w-[46px] h-[100%] hover:bg-opacity-5 hover:bg-white-500 hover:text-white-500 items-center flex justify-center'
          onClick={() => setIsMaximized(ipc.sendSync('maximize'))}
        >
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </button>

        <button
          className='no-drag w-[46px] h-[100%] hover:bg-red-600 hover:text-white-500 flex items-center justify-center'
          onClick={() => ipc.sendSync('close')}
        >
          <VscChromeClose />
        </button>
      </div>

    </nav>
  )
}
