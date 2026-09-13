import prisma from "../utils/prisma"

export async function getNatures() {
    try {
        const natures = await prisma.nature.findMany()
        return natures
    } catch (error) {
        throw error
    }
}
