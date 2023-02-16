import { UseRoutesProps } from "../utils/useIpcRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";
import fs from 'fs'
import path from 'path'

import { windowCreator } from '../utils/windowCreator'
import { ServiceOrdersType } from '../server/preventiveOsTools'

import { useDialog } from '../utils/useDialog'
import { BrowserWindow } from "electron";

export function printServiceOrder({ ipcMain, window }: UseRoutesProps) {

    const dialog = useDialog(window)

    let isOpen = false

    ipcMain.on('printServiceOrder', (event, args: ServiceOrdersType) => {

        let serviceOrderWindow: BrowserWindow | null

        const pdfname =
            `${args.id}_${args.weekCode.replace('W', 'S')}_${args.machine?.tag}-${args.nature?.name}.pdf`

        if (!isOpen) {

            isOpen = true

            serviceOrderWindow = windowCreator({
                title: 'Oredem de Serviço Preventiva',
                devTools: true,
                height: 700,
                width: 900,
                icon: '',
                parent: window,
                maximizable: false,
                minimizable: false,
                resizable: true,
                frame: true,
                url: `http://localhost:9999/createServiceorder?data=${JSON.stringify(args)}`
            }).load()

            serviceOrderWindow.removeMenu()



            ipcMain.on('runPrint', (event, args) => {
                serviceOrderWindow?.webContents.print({
                    pageSize: 'A4',
                    margins: {
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                    }
                })
            })

            event.returnValue = true

            serviceOrderWindow.on('close', () => {
                isOpen = false
            })

        }
    })

    ipcMain.on('runPrintToPdf', async (event, args) => {
        const pdfpath = dialog.openFile('Escolha a pasta para salvar o PDF', 'Salvar Ordem de Serviço Preventiva')
        if (pdfpath) {
            const pdf = await BrowserWindow.fromWebContents(event.sender)?.webContents.printToPDF({
                pageSize: 'A4',
                margins: {
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                }
            })
            pdf && fs.writeFileSync(path.join(pdfpath[0], `${args}.pdf`), pdf, 'binary')
        }
    })

}