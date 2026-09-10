import asyncio

from rich.console import Console

from use_cases.get_service_order_by_id import getServiceOrderById
from utils.prisma import connect, disconnect

console = Console()


async def main() -> None:
    await connect()

    service_order = await getServiceOrderById({"id": 1})
    console.print(service_order)

    await disconnect()


if __name__ == "__main__":
    asyncio.run(main())
