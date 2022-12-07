import 'electron'

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