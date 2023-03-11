import { UseRoutesProps } from "../utils/useIpcRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";
import fs from 'fs'
import path from 'path'

import { windowCreator } from '../utils/windowCreator'
import { ServiceOrdersType } from '../../schemas/preventive'

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
                url: `http://localhost:9999/createServiceorder/${args.id}`
            }).load()



            serviceOrderWindow.removeMenu()

            event.returnValue = true

            serviceOrderWindow.on('close', () => {
                isOpen = false
            })

        }
    })

    ipcMain.on('runPrint', (event, args) => {
        BrowserWindow.fromWebContents(event.sender)?.webContents.print({
            pageSize: 'A4',
            margins: {
                bottom: 10,
                left: 10,
                right: 10,
                top: 10,
            }
        }, (success) => {
            success && dialog.success('Sucesso!!', 'A Ordem de Serviço foi Impressa!!')
        })
    })

    ipcMain.on('runPrintToPdf', async (event, args) => {
        const pdfpath = dialog.openFile('Escolha a pasta para salvar o PDF', 'Salvar Ordem de Serviço Preventiva')
        if (pdfpath) {
            try {
                const pdf = await BrowserWindow.fromWebContents(event.sender)?.webContents.printToPDF({
                    pageSize: 'A4',
                })
                if (pdf) {
                    fs.writeFileSync(path.join(pdfpath[0], `${args}.pdf`), pdf, 'binary')
                    dialog.success('Sucesso!!', 'A Ordem de Serviço foi Salva!!')
                }
            } catch (error) {
                dialog.error(String(error))
            }
        }
    })

}