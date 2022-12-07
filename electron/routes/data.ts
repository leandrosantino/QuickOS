import { UseRoutesProps } from "../modules/useRoutes";
import { MainRoutes, RenderRoutes } from "../../@types/Routes";

import { prisma } from "../lib/prisma";

export function dataRoutes({ipcMain, window}: UseRoutesProps){
    
    ipcMain.on('teste' as MainRoutes, async (event, args)=>{
        try {
            const val = await prisma.user.findMany()
            event.returnValue = JSON.stringify({val})
        } catch (error) {
            event.returnValue = String(error)
        }
    })

}