import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipc', {
    send(channel:string, args:{}){
        ipcRenderer.send(channel, args)
    },
    sendSync(channel:string, args:{}){
        return ipcRenderer.sendSync(channel, args)
    },
    on(channel:string, func:Function){
        ipcRenderer.on(channel, (event, args:{}) => func(event, args));
    }
});



