// import { useState } from 'react';
import { NavBar } from '../components/navbar/NavBar';
import { SideMenu } from '../components/sidemenu/SideMenu';
import { PagesContextProvider } from '../contexts/PagesContext';

import { DialogContextProvider, Dialogs } from '../contexts/DialogContext'

import {} from 'react-toastify'

import AppRoutes from '../routes/app.routes'

export function Routes() {

  return (
    <PagesContextProvider>
      <DialogContextProvider>
        <NavBar />
        <div className='h-page w-[100%] flex flex-row'>
          <SideMenu />
          <AppRoutes />
          <Dialogs />
        </div>
      </DialogContextProvider>
    </PagesContextProvider>
  )
}
