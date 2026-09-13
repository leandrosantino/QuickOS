from infra.prisma import prisma


async def getNatures() -> list:
    return await prisma.nature.find_many()
