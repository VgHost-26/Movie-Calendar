import { useState } from "react"
import { dateToShortUTC } from "../functions"
import { ExpandButton } from "./buttons/ExpandButton"
import { DeleteButton } from "./buttons/DeleteButton"

export function MovieList({
  title,
  pastOrFuture,
  movies,
  filters,
  collapsed,
  collapseFunction,
  editMode,
  deleteMovie,
  images,
}) {
  const today = new Date()

  return (
    <>
      <p className="movie-list-title">
        {title}
        <ExpandButton onClick={collapseFunction} hidden={collapsed}>
          <img
            title={collapsed ? "expand" : "collapse"}
            alt="<"
            src={images.icons['chevron-left']}
          />
        </ExpandButton>
      </p>
      <div
        collapsed={String(collapsed)}
        className={
          "movie-list " +
          (pastOrFuture === "future" ? "coming-soon" : "already-out")
        }
      >
        {!collapsed
          ? movies.map(movie => {
              if (filters[movie.platform]) {
                if (
                  (new Date(movie.date) <= today && pastOrFuture === "past") ||
                  (new Date(movie.date) > today && pastOrFuture === "future")
                ) {
                  return (
                    <div
                      className="movie-cell"
                      key={movie.date + movie.title + movie.platform}
                    >
                      <div className="movie-title">
                        <img
                          draggable="false"
                          className="platform-logo"
                          src={images.logos[movie.platform]}
                          alt=""
                        />

                        {movie.title}
                      </div>
                      <div className="movie-date">
                        {!editMode ? (
                          dateToShortUTC(new Date(movie.date))
                        ) : (
                          <DeleteButton
                            handleClick={() => deleteMovie(movie)}
                          />
                        )}
                      </div>
                    </div>
                  )
                }
              }
            })
          : ""}
      </div>
    </>
  )
}
