from datetime import timedelta

from dateutil import parser


def differenceInMinutes(finish: str, start: str) -> int:
    return (parser.parse(finish) - parser.parse(start)) // timedelta(minutes=1)
