import { BrowserWindow, dialog } from 'electron'

export function useDialog(window: BrowserWindow) {

    function openFile(message: string, title: string) {
        const resp = dialog.showOpenDialogSync(window, {
            message, title,
            securityScopedBookmarks: true,
            properties: ['openDirectory',],
        })
        return resp
    }

    return { openFile }

}