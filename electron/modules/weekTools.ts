import { getYear, getWeek, addWeeks } from 'date-fns'
const weekYearRegex = new RegExp(/\d{4}-W\d{2}/)

export function incrementWeekYear(week: number, year: number, increment: number) {
    const weekDate = weekYearToDate(week, year)
    const incrementedWeekDate = addWeeks(weekDate, increment)
    return {
        week: getWeek(incrementedWeekDate),
        year: getYear(incrementedWeekDate),
    }
}

export function weekYearStringToNumber(string: string){
    try {
        if(!weekYearRegex.test(string)){
            throw new Error('String week not compatible with the standard!')
        }
        return {
            week: Number(string.split('-W')[1]),
            year: Number( string.split('-W')[0]),
        }
    } catch (error) {
        throw error
    }
}

export function weekYearToString(week: number, year: number){
    try {
        const weekStr = String(week).length < 2? `0${week}`: week
        const weekYearStr = `${year}-W${weekStr}`
        if(!weekYearRegex.test(weekYearStr)){
            throw new Error('Week and year not compatible with the standard!')
        }
        return weekYearStr
    } catch (error) {
        throw error
    }
     
}

export function weekYearToDate(week: number, year: number) {
    const day = (1 + (week - 1) * 7) + 6
    return new Date(year, 0, day)
}