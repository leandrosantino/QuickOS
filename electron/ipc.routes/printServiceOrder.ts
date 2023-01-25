import { UseRoutesProps } from "../utils/useIpcRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";
import fs from 'fs'
import path from 'path'

import { windowCreator } from '../utils/windowCreator'
import { ServiceOrdersType } from '../utils/preventiveOsTools'

import { useDialog } from '../utils/useDialog'
import { BrowserWindow } from "electron";

export function printServiceOrder({ ipcMain, window }: UseRoutesProps) {

    const dialog = useDialog(window)
    let serviceOrderWindow:BrowserWindow

    ipcMain.on('printServiceOrder', (event, args: ServiceOrdersType) => {

        const pdfname = 
        `${args.id}_${args.weekCode.replace('W', 'S')}_${args.machine?.tag}-${args.nature?.name}.pdf`

        serviceOrderWindow = windowCreator({
            devTools: true,
            height: 700,
            width: 600,
            icon: '',
            parent: window,
            maximizable: false,
            minimizable: false,
            resizable: true,
            frame: true,
            url: `http://localhost:9999/createServiceorder/${JSON.stringify(args)}`
        }).load()

        serviceOrderWindow.removeMenu()

        ipcMain.on('runPrintToPdf', async (event, args) => {
            const pdfpath = dialog.openFile('Escolha a pasta para salvar o PDF', 'Salvar Orden de Serviço Preventiva')
            if (pdfpath) {
                const pdf = await serviceOrderWindow.webContents.printToPDF({
                    pageSize: 'A4',
                })
                fs.writeFileSync(path.join(pdfpath[0], pdfname), pdf, 'binary')
            }
        })

        ipcMain.on('runPrint', (event, args) => {
            serviceOrderWindow.webContents.print({
                pageSize: 'A4',
            })
        })

        event.returnValue = true

    })

}