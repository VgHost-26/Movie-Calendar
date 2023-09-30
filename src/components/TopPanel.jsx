import { useState } from "react"
import { platformNames, platforms } from "../globals"
import LoginPanel from "./LoginPanel"

export function TopPanel({ onSubmit, hidden, logInWithGoogle, logOut, images}) {
  const [movieTitle, setMovieTitle] = useState("")
  const [moviePlatform, setMoviePlatform] = useState("")
  const [movieDate, setMovieDate] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (movieTitle === '' || movieDate === '' || moviePlatform === '') return

    onSubmit(movieTitle, moviePlatform, movieDate)
    setMovieTitle('')
    setMoviePlatform('')
    setMovieDate('')
    addNewMovieButton.blur()
  }

  return (
    <div id="top-panel" className="top-panel">
      {!hidden ? (
        <>
        <form
          onSubmit={e => {
            handleSubmit(e)
          }}
        >
          <input
            type="text"
            placeholder="title"
            className="input-title"
            autoComplete="off"
            id="title"
            onChange={e => setMovieTitle(e.target.value)}
            value={movieTitle}
          />

          <label>
            <img
              draggable="false"
              className="platform-logo"
              src={images.logos[moviePlatform]}
              alt=""
            />

            <select
              id="select-platform"
              name="platform"
              value={moviePlatform}
              onChange={e => {
                setMoviePlatform(e.target.value)
              }}
            >
              <option value="" hidden>
                Select Platform
              </option>
              {platforms.map(platform => {
                return <option value={platform}>{platformNames[platform]}</option>
                
              })}
            </select>
          </label>
          <input
            className="date-input"
            type="date"
            value={movieDate}
            onChange={e => setMovieDate(e.target.value)}
          />
          <input id="addNewMovieButton" className="add-button" type="submit" value="+" />
        </form>
        <LoginPanel logInWithGoogle={logInWithGoogle} logOut={logOut} images={images}/>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
