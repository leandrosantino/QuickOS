import re
from datetime import date

from dateutil.relativedelta import relativedelta

week_year_regex = re.compile(r"\d{4}-W\d{2}")


def _iso_week_to_date(week: int, year: int) -> date:
    january_4 = date(year, 1, 4)
    return january_4 + relativedelta(weeks=week - january_4.isocalendar().week)


def incrementWeekYear(week: int, year: int, increment: int) -> dict:
    target = _iso_week_to_date(week, year) + relativedelta(weeks=increment)
    iso = target.isocalendar()
    return {"week": iso.week, "year": iso.year}


def weekYearStringToNumber(string: str) -> dict:
    if not week_year_regex.search(string):
        raise ValueError("String week not compatible with the standard!")
    year, week = string.split("-W")
    return {"week": int(week), "year": int(year)}


def weekYearToString(week: int, year: int) -> str:
    week_str = str(week) if len(str(week)) >= 2 else f"0{week}"
    week_year_str = f"{year}-W{week_str}"
    if not week_year_regex.search(week_year_str):
        raise ValueError("Week and year not compatible with the standard!")
    return week_year_str


def weekYearToDate(week: int, year: int) -> date:
    day = (1 + (week - 1) * 7) + 6
    return date(year, 1, day)
