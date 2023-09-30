function getAllDatesTill(year, month = 0, day = 1) {
  // 'if date from the past is give it will give backward results'
  const endDate = new Date(year, month, day)

  const dates = []
  dates.push(new Date())

  while (
    dates[dates.length - 1].getFullYear() !== endDate.getFullYear() ||
    dates[dates.length - 1].getMonth() !== endDate.getMonth() ||
    dates[dates.length - 1].getDate() !== endDate.getDate()
  ) {
    dates.push(new Date(dates[dates.length - 1]))

    if (endDate < dates[0]) {
      dates[dates.length - 1].setDate(dates[dates.length - 1].getDate() - 1)
    } else {
      dates[dates.length - 1].setDate(dates[dates.length - 1].getDate() + 1)
    }
  }
  dates.pop()
  return dates
}

export function getAllDatesFromTo(
  Fyear,
  Fmonth,
  Fday,
  Tyear,
  Tmonth = 0,
  Tday = 1
) {
  const endDate = new Date(Tyear, Tmonth, Tday)
  const startDate = new Date(Fyear, Fmonth, Fday)

  const dates = []
  dates.push(startDate)

  while (
    dates[dates.length - 1].getFullYear() !== endDate.getFullYear() ||
    dates[dates.length - 1].getMonth() !== endDate.getMonth() ||
    dates[dates.length - 1].getDate() !== endDate.getDate()
  ) {
    dates.push(new Date(dates[dates.length - 1]))

    dates[dates.length - 1].setDate(dates[dates.length - 1].getDate() + 1)
  }
  dates.pop()
  return dates
}

export function extendMonth(days) {
  let startingDay = days[0]
  let lastDay = days[days.length - 1]
  let addFront = (((startingDay.getDay() - 1) % 7) + 7) % 7
  let addEnd = 7 - lastDay.getDay()
  if (addEnd === 7 ) addEnd = 0


  for (let i = 0; i < addEnd; i++) {
    days.push(new Date(days[days.length - 1]))
    days[days.length - 1].setDate(days[days.length - 1].getDate() + 1)
  }
  for (let i = 0; i < addFront; i++) {
    days.unshift(new Date(days[0]))
    days[0].setDate(days[0].getDate() - 1)
  }

  return days
}

export function compareMovie(movie_a, movie_b){
  if(movie_a.date>movie_b.date) return 1
  if(movie_a.date<movie_b.date) return -1
  return 0
}
export function dateToShortUTC(date) {
  let d = date
  date = date.toUTCString()
  date = date.split(" ")
  let newDate = date[1] + " " + date[2]
  if (d.getFullYear() != new Date().getFullYear()) {
    newDate += " " + date[3]
  }
  return newDate
}
