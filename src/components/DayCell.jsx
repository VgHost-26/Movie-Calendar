export function DayCell({
  day,
  weekday,
  month,
  year,
  selectedMonth,
  movies,
  images,
}) {
  let sMonth = parseInt(month) <= 9 ? "0" + (parseInt(month) + 1) : month
  let sDay = parseInt(day) <= 9 ? "0" + day : day
  let date = year + "-" + sMonth + "-" + sDay

  const todayString = (y, m, d) => {
    const date = new Date()
    return (
      date.getFullYear() === y && date.getMonth() === m && date.getDate() === d
    )
  }

  return (
    <div
      className={
        "day-cell" +
        (month !== selectedMonth ? " greyed" : "") +
        (todayString(year, month, day) === true ? " today" : "")
      }
      day={weekday}
    >
      <div className="day-number">{day}</div>

      {movies.map(movie => {
        if (movie.date == date) {
          return (
            <>
              <div key={movie.id} className="movie-title">
                <img
                  draggable="false"
                  className="platform-logo"
                  src={images.logos[movie.platform]}
                  alt=""
                />
                {movie.title}
              </div>
            </>
          )
        }
      })}
    </div>
  )
}
