from infra.prisma import prisma


async def getMachines() -> list:
    return await prisma.machine.find_many()
