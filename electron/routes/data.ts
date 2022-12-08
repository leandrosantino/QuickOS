import { UseRoutesProps } from "../modules/useRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";

import { prisma } from "../services/prisma";
//import { store } from "../services/store";

export function dataRoutes({ipcMain, window}: UseRoutesProps){
    
    ipcMain.on('teste' as MainRoutes, async (event, args)=>{
        try {
            const val = await prisma.user.findMany()
            event.returnValue = JSON.stringify({val})

            // const value = Number(store.get('increment'))

            // const teste = value?value: 0

            // store.set('increment', teste+1)

        } catch (error) {
            event.returnValue = String(error)
        }
    })

}