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

    function success(title: string, message: string) {
        dialog.showMessageBoxSync(window, {
            message,
            title,
            type: 'info'
        })
    }

    function error(message: string) {
        dialog.showErrorBox('Erro!', message)
    }

    return { openFile, success, error }

}