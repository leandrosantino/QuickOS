import prisma from "../utils/prisma"

export async function getWorkers() {
    try {
        const workers = await prisma.worker.findMany()
        return workers
    } catch (error) {
        throw error
    }
}

export async function getWorkerById(id: number) {
    try {
        const worker = await prisma.worker.findUnique({
            where: { id }
        })
        return worker
    } catch (error) {
        throw error
    }
}

export async function getWorkerByRegistration(registration: number) {
    try {
        const worker = await prisma.worker.findUnique({
            where: { registration }
        })
        return worker
    } catch (error) {
        throw error
    }
}
