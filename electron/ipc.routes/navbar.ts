import { UseRoutesProps } from "../utils/useIpcRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";

export function navBarRoutes({ ipcMain, window }: UseRoutesProps) {

    ipcMain.on('close' as keyof MainRoutes, (event, args) => {
        event.returnValue = window.close()
    })
    ipcMain.on('maximize' as keyof MainRoutes, (event, args) => {
        if (window.isMaximized()) {
            window.restore()
            event.returnValue = false
        } else {
            window.maximize()
            event.returnValue = true
        }
    })

    ipcMain.on('isMaximized' as keyof MainRoutes, (event, args) => {
        event.returnValue = window.isMaximized()
    })

    ipcMain.on('minimize' as keyof MainRoutes, (event, args) => {
        event.returnValue = window.minimize()
    })

    window.on('resize', () => {
        window.webContents.send('changeIconMaximizeButton' as RenderRoutes, window.isMaximized())
    })

}