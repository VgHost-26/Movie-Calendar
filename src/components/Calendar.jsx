import { useState } from "react"
import { getAllDatesFromTo, extendMonth } from "../functions"
import { ChangeMonthButton } from "./buttons/ChangeMonthButton"
import { DayCell } from "./DayCell"
import { ExpandButton } from "./buttons/ExpandButton"
import { useEffect } from "react"

export function Calendar({
  selectedYear = new Date().getFullYear(),
  selectedMonth = new Date().getMonth(),
  movies,
  expandFunction,
  isExpanded,
  images,
}) {
  const [selMonth, setSelMonth] = useState(selectedMonth % 11)
  const [selYear, setSelYear] = useState(selectedYear)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const tmpDays = getAllDatesFromTo(selYear, selMonth, 1, selYear, selMonth + 1)
  const days = extendMonth(tmpDays)

  function changeMonth(dir) {
    let tmpMonth = selMonth
    if (dir === "r") {
      if (selMonth + 1 > 11) {
        tmpMonth = -1
        setSelYear(selYear + 1)
      }

      setSelMonth(tmpMonth + 1)
    } else if (dir === "l") {
      if (selMonth - 1 < 0) {
        tmpMonth = 12
        setSelYear(selYear - 1)
      }

      setSelMonth(tmpMonth - 1)
    } else {
      let nowYear = new Date().getFullYear()
      let nowMonth = new Date().getMonth()
      setSelMonth(nowMonth)
      setSelYear(nowYear)
    }
  }

  return (
    <>
      <div id="calendar">
        <div className="top-bar">
          <ChangeMonthButton handleClick={changeMonth} direction="l" images={images}/>
          <div className="month-name">
            {monthNames[selMonth]}
            {new Date().getMonth() !== selMonth && (
              <ChangeMonthButton handleClick={changeMonth} direction="c" images={images}/>
            )}
          </div>

          <ChangeMonthButton handleClick={changeMonth} direction="r" images={images} />
          <div className="year">
            {selYear}
          </div>
            <ExpandButton onClick={expandFunction} hidden={isExpanded}>
              {!isExpanded ? (
                <img title="full screen" alt="full" src={images.icons['full-screen-2']} />
              ) : (
                <img title="exit full screen" alt="!full" src={images.icons['exit-full-screen-2']} />
              )}
            </ExpandButton>
        </div>
        {days.map(day => {
          return (
            <DayCell
              day={day.getDate()}
              weekday={day.getDay()}
              month={day.getMonth()}
              year={day.getFullYear()}
              selectedMonth={selMonth}
              movies={movies}
              images={images}
              key={
                day.getMonth() + "-" + day.getDate() + "-" + day.getFullYear()
              }
            />
          )
        })}
      </div>
    </>
  )
}
