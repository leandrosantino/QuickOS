import { usePages } from '../../hooks/usePages'

import { IoMdSettings } from 'react-icons/io'
import { FaTools } from 'react-icons/fa'
import { BsFillCalendar2CheckFill } from 'react-icons/bs'
import { IoBarChartSharp } from 'react-icons/io5'

import { HomeProps } from '../../pages/Dashboard'
import { SideMenuPageButton } from './SideMenuPageButton'
import SideMenuTitle from './SideMenuTitle';



export function SideMenu() {

  const { goToPage, currentPage, sideMenuIsReduce, backPage } = usePages()

  const reduced = sideMenuIsReduce

  return (
    <div
      className={`
        transition-all
        h-[100%] bg-gray-800
        border-r-4
        border-r-green-500
        ${reduced ?
          'w-sideMenuReduce' :
          'w-sideMenuFull'
        }
      `}
    >

      <SideMenuTitle reduced={reduced} />

      <div className='mt-2'>
        
      {/* <button
        className="bg-gray-100 w-10 h-4"
        onClick={()=>backPage()}
      >
        voltar
      </button> */}

        <SideMenuPageButton
          reduced={reduced}
          Icon={IoBarChartSharp}
          activated={currentPage === "Dashboard"}
          title="Dashboard"
          onclick={() => goToPage<HomeProps>('Dashboard', { nome: 'Leandro' })}
        />
        <SideMenuPageButton
          reduced={reduced}
          Icon={BsFillCalendar2CheckFill}
          activated={currentPage.search("Preventive") > -1}
          title="Preventivas"
          onclick={() => goToPage('Preventive', {})}
        />
        <SideMenuPageButton
          reduced={reduced}
          Icon={FaTools}
          activated={currentPage.search("Corrective") > -1}
          title="Corretivas"
          onclick={() => goToPage('Corrective', {})}
        />
        <SideMenuPageButton
          reduced={reduced}
          Icon={IoMdSettings}
          activated={currentPage.search("Settings") > -1}
          title="Configurações"
          onclick={() => goToPage('Settings', {})}
        />
      </div>

    </div>
  )
}
