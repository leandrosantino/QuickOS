import { UseRoutesProps } from "../modules/useRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";

export function navBarRoutes({ipcMain, window}: UseRoutesProps){
    
    ipcMain.on('close' as MainRoutes, (event, args)=>{
        event.returnValue = window.close()
    })
    ipcMain.on('maximize' as MainRoutes, (event, args)=>{
        if(window.isMaximized()){
            window.restore()
            event.returnValue = false
        }else{
            window.maximize()
            event.returnValue = true
        }
    })

    ipcMain.on('isMaximized' as MainRoutes, (event, args)=>{
        event.returnValue = window.isMaximized()
    })

    ipcMain.on('minimize' as MainRoutes, (event, args)=>{
        event.returnValue = window.minimize()
    })

    window.on('resize', ()=>{
        window.webContents.send('changeIconMaximizeButton' as RenderRoutes, window.isMaximized())
    })

}