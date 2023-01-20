import {z} from 'zod'

export const MainRutesParams = {
    maximize : z.object({
        a: z.string()
    })._type ,

    minimize : z.object({
        b: z.number()
    })._type,

    close : z.object({
        
    })._type,

    isMaximized : z.object({
        
    })._type,

    teste : z.object({
        
    })._type,

}

const a: MainRutesParams.maximize

export type MainRoutes =  keyof typeof MainRutesParams

export type RenderRoutes = 
    'update' |
    'changeIconMaximizeButton'|
    'onWindowResize'