from utils.prisma import prisma


async def getWorkers() -> list:
    return await prisma.worker.find_many()


async def getWorkerById(id: int):
    return await prisma.worker.find_unique(where={"id": id})


async def getWorkerByRegistration(registration: int):
    return await prisma.worker.find_unique(where={"registration": registration})
