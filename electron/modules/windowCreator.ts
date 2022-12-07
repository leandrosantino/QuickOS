import {BrowserWindow} from 'electron'
import path from 'path'

interface BrowserWindowOptions extends Electron.BrowserWindowConstructorOptions {}
export interface WindowCreatorProps {
    icon: string;
    width: number; 
    height: number; 
    devTools: boolean;
    url: string;
}

export function windowCreator({icon, width, height, devTools, url} : WindowCreatorProps){
    const options: BrowserWindowOptions  = {
        width, height, icon,
        frame: false,
        minHeight: height,
        minWidth: width,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            devTools,
            preload: path.join(__dirname, '../preload.js')
        }
    }


    function load(){
        let window = new BrowserWindow(options)
        window.loadURL(url)
        window.once('ready-to-show', async ()=>{
            window.show()
            window.maximize()
        });
        window.on("closed", () => {
            window = {} as BrowserWindow;
        });
        return window
    }

    return {load}

}

