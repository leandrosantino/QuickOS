import AppRoutes from '../routes/app.routes'

import { NavBar } from '../components/navbar/NavBar';
import { SideMenu } from '../components/sidemenu/SideMenu';
import { PagesContextProvider } from '../contexts/PagesContext';

import { DialogContextProvider, Dialogs } from '../contexts/DialogContext'
import { ToastProvider } from '../components/ToastProvider'

window.ipc.send('maximize', {})

export function Routes() {

  return (
    <PagesContextProvider>
      <DialogContextProvider>
        <NavBar />
        <div className='h-page w-[100%] flex flex-row'>
          <SideMenu />
          <AppRoutes />
          <ToastProvider />
          <Dialogs />
        </div>
      </DialogContextProvider>
    </PagesContextProvider>
  )
}
