import { UseRoutesProps } from "../utils/useIpcRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";

import {windowCreator} from '../utils/windowCreator'
import {ServiceOrdersType} from '../utils/preventiveOsTools'


export function navBarRoutes({ ipcMain, window }: UseRoutesProps) {

    ipcMain.on('printServiceOrder', (event, args : ServiceOrdersType)=>{


        const browser = windowCreator({
            devTools: false,
            height: 122,
            width: 122,
            icon: '',
            url: `http://localhost:9999/createServiceorder/${JSON.stringify(args)}`
        })

        const serviceOrderWindow = browser.load()

        ipcMain.on('runPrint', (event, args)=>{
            serviceOrderWindow.webContents.printToPDF({})
            serviceOrderWindow.close()
        })

    })

}