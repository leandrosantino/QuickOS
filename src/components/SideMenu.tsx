import { usePages } from '../hooks/usePages'

import {VscHome, VscArrowRight} from "react-icons/vsc";

import { HomeProps } from '../pages/Home'
import { SideMenuButton } from './SideMenuButton'

interface SideMenuProps {
  reduced: boolean
}

export function SideMenu({reduced} : SideMenuProps) {

  const {goToPage, currentPage} = usePages()

  return (
    <div
      className={`
        transition-all
        h-[100%] bg-gray-800
        ${
          reduced?
          'w-[50px]':
          'w-[256px]'
        }
      `} 
    >

      <div className='mt-6'>
        <SideMenuButton 
          reduced={reduced}
          Icon={VscHome} 
          activated={currentPage === "Dashboard"} 
          title="Dashboard" 
          onclick={()=>goToPage<HomeProps>('Dashboard', {nome:'Leandro'})}
        />
        <SideMenuButton 
          reduced={reduced}
          Icon={VscArrowRight} 
          activated={currentPage === "Send"} 
          title="Send" 
          activeColor='blue-500'
          onclick={()=>goToPage('Send', {})}
        />
      </div>
     
    </div>
  )
}
