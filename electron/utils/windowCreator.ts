import { BrowserWindow } from 'electron'
import path from 'path'

interface BrowserWindowOptions extends Electron.BrowserWindowConstructorOptions { }
export interface WindowCreatorProps {
    icon: string;
    width: number;
    height: number;
    devTools: boolean;
    url: string;
    parent?: BrowserWindow;
    minimizable?: boolean
    maximizable?: boolean
    resizable?: boolean
    frame?: boolean
    maximize?: boolean,
    title: string
}

export function windowCreator({
    icon, width, height, devTools, parent, url,
    maximizable, minimizable, resizable, frame, maximize,
    title
}: WindowCreatorProps) {
    const options: BrowserWindowOptions = {
        title,
        width, height, icon,
        frame,
        minHeight: height,
        minWidth: width,
        show: false,
        maximizable,
        minimizable,
        resizable,
        parent,
        modal: parent ? true : false,
        webPreferences: {
            nodeIntegration: true,
            devTools,
            preload: path.join(__dirname, './preload.js')
        }
    }

    function load() {
        let window: BrowserWindow | null = new BrowserWindow(options)
        window.loadURL(url)
        window.once('ready-to-show', () => {
            window?.show()
            maximize && window?.maximize()
        });
        window.on("closed", () => {
            window = null;
        });
        return window
    }

    return { load }

}

