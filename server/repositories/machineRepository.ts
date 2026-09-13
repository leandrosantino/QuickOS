import prisma from "../utils/prisma"

export async function getMachines() {
    try {
        const machines = await prisma.machine.findMany()
        return machines
    } catch (error) {
        throw error
    }
}
