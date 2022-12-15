// import { useState } from 'react';
import { NavBar } from '../components/navbar/NavBar';
import { SideMenu } from '../components/sidemenu/SideMenu';
import { PagesContextProvider } from '../contexts/PagesContext';

import AppRoutes from '../routes/app.routes'

export function Routes() {

  return (
    <PagesContextProvider>
      <NavBar />
      <div className='h-page w-[100%] flex flex-row'>
        <SideMenu />
        <AppRoutes />
      </div>
    </PagesContextProvider>
  )
}
