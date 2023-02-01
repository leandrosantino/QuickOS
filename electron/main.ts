import { app, globalShortcut, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";

import { windowCreator } from './utils/windowCreator'
import { useRoutes } from "./utils/useIpcRoutes";

import { navBarRoutes } from "./ipc.routes/navbar";
import { printServiceOrder } from "./ipc.routes/printServiceOrder";

!isDev && import('./server')

async function main() {

    const window = windowCreator({
        width: 1300,
        height: 650,
        devTools: isDev,
        maximizable: true,
        minimizable: true,
        frame: false,
        resizable: true,
        url: isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "./index.html")}`,
        icon: '',
        maximize: true,
    }).load()

    const routes = useRoutes({ window, ipcMain })

    routes.use(navBarRoutes)
    routes.use(printServiceOrder)

}

!isDev && app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+R', () => { })
    globalShortcut.register('F5', () => { })
})

app.disableHardwareAcceleration()

app.on("ready", main);

app.on('window-all-closed', () => {
    app.exit();
    app.quit();
}); 