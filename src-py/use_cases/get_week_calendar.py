from datetime import datetime
from typing import Literal

from dateutil import tz
from rich.console import Console

from schemas.preventive import WeekCalendarData
from use_cases.get_service_order_count import getServiceOrderCount

TOTAL_WEEK_IN_ONE_YEAR = 52


async def getWeekCalendar(year: int) -> list[WeekCalendarData]:
    calendar: list[WeekCalendarData] = []

    for week_number in range(1, TOTAL_WEEK_IN_ONE_YEAR + 1):
        data = await getServiceOrderCount({"week": week_number, "year": year})
        total = data.finished + data.unfinished
        hasOrders = total > 0
        completion = 0
        if hasOrders:
            completion = round((data.finished / total) * 100)
        status = getWeekStauts(week_number, year, completion, data.finished, total)
        start_of_week, end_of_week = week_date_range(week_number, year)
        week = WeekCalendarData(
            week=week_number,
            executed=data.finished,
            pending=data.unfinished,
            total=total,
            completion=completion,
            hasOrders=hasOrders,
            status=status,
            end_of_week=end_of_week,
            start_of_week=start_of_week,
        )
        calendar.append(week)

    return calendar


from datetime import datetime, timedelta


def week_date_range(week: int, year: int) -> tuple[str, str]:
    base_date = datetime(year, 1, 4)
    _, base_week, base_day_of_week = base_date.isocalendar()

    start_of_week = (
        base_date
        - timedelta(days=base_day_of_week - 1)
        + timedelta(weeks=week - base_week)
    )
    end_of_week = start_of_week + timedelta(days=6)

    return (start_of_week.strftime("%d/%m"), end_of_week.strftime("%d/%m"))


def getWeekStauts(
    week: int, year: int, completion: int, executed: int, total: int
) -> Literal["completed", "overdue", "default"]:

    if total == 0:
        return "default"

    now = datetime.now(tz.tzlocal())
    currentWeek = now.isocalendar()[1]
    currentYear = now.year
    isPastWeek = year < currentYear or (year == currentYear and week < currentWeek)

    if completion == 100:
        return "completed"
    if isPastWeek and executed < total:
        return "overdue"

    return "default"
