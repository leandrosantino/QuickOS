import 'electron'
import { ipcMain } from 'electron';

export interface UseRoutesProps {
    window:Electron.BrowserWindow;
    ipcMain:Electron.IpcMain;
}

export function useRoutes(props:UseRoutesProps){

    function use(callback:(props:UseRoutesProps)=>void){
        callback(props)
    }
    
    return {
        use
    }

}

class Route<T>{
    constructor(path: string){
        this.path = path
    }
    path: string;
    send(func:any , params?: T){
        func(params)
    }
    on(func:any){
        func()
    }
}


