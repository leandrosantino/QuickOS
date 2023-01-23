import {TRPCError} from '@trpc/server'
import {z} from 'zod'

export function internalServerError(error:any){
    return new TRPCError({
        code:'INTERNAL_SERVER_ERROR',
        message: String(error.message)
    })
}


export const SuccessResponseSchema = z.object({
    message: z.string(),
    code: z.number(),
})
export function successResponse(){
    return {
        message: 'Successfully performed operation!',
        code: 200
    }
}