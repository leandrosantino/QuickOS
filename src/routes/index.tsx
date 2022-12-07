import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { SideMenu } from '../components/SideMenu';
import { PagesContextProvider} from '../contexts/PagesContext';

import AppRoutes from '../routes/app.routes'

export function Routes() {

  const [displaySideMenu, setDisplaySideMenu] = useState<boolean>(false)

  return (
    <PagesContextProvider>
      <NavBar handleMenuClick={()=>setDisplaySideMenu(!displaySideMenu)} />
        <div className='h-page w-[100%] flex flex-row'>
          <SideMenu reduced={displaySideMenu}/>
          <AppRoutes/>
        </div>
    </PagesContextProvider>
  )
}
