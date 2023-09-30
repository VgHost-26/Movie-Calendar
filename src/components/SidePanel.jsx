import { useEffect, useState } from "react"
import { ExpandButton } from "./buttons/ExpandButton"
import { MovieList } from "./MovieList"
import { platforms } from "../globals"
import { SwitchModeButton } from "./buttons/SwitchModeButton"

export function SidePanel({
  movies,
  hidden,
  images,
  hideFunction,
  deleteMovie,
}) {
  const today = new Date()
  const [collapsed_aout, setCollapsed_aout] = useState(false)
  const [collapsed_cson, setCollapsed_cson] = useState(false)
  const [filters, setFilters] = useState(
    Object.fromEntries(platforms.map(platform => [platform, true]))
  )
  const [editMode, setEditMode] = useState(false)
  function updateFilters(p, value) {
    const TMPfilter = Object.fromEntries(Object.entries(filters).slice(0))
    TMPfilter[p] = value
    setFilters(TMPfilter)
    console.log(filters)
  }

  return (
    <div
      aout-collapsed={String(collapsed_aout)}
      cson-collapsed={String(collapsed_cson)}
      id="side-panel"
      className={"side-panel" + (hidden ? " hidden" : "")}
      // style={{gridTemplateRows: `50px 40px ${(movies.filter(movie => (new Date(movie.date) <= new Date())).length * 40)}px 40px min-content`}}
    >
      <div className="side-top-panel">
        {!hidden ? (
          <div className="filters">
            {platforms.map(platform => {
              return (
                <>
                  <label>
                    <input
                      id={platform + "filter-checkbox"}
                      type="checkbox"
                      checked={filters[platform]}
                      onChange={e => updateFilters(platform, e.target.checked)}
                    />
                    <img
                      draggable="false"
                      src={images.logos[platform]}
                    />
                  </label>
                </>
              )
            })}
          </div>
        ) : (
          ""
        )}
        <div className="buttons">
          <ExpandButton onClick={hideFunction} hidden={hidden}>
            <img
              title="hide side panel"
              alt="<"
              src={images.icons['chevron-left']}
            />
          </ExpandButton>
          {!hidden ? (
            <SwitchModeButton
              editMode={editMode}
              images={images}
              handleClick={() =>
                editMode ? setEditMode(false) : setEditMode(true)
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {!hidden ? (
        <>
          <MovieList
            title={"Already Out"}
            pastOrFuture={"past"}
            movies={movies}
            filters={filters}
            collapsed={collapsed_aout}
            editMode={editMode}
            deleteMovie={deleteMovie}
            images={images}
            collapseFunction={() => {
              collapsed_aout
              ? setCollapsed_aout(false)
              : setCollapsed_aout(true)
            }}
            />
          <MovieList
            title={"Coming Soon"}
            pastOrFuture={"future"}
            movies={movies}
            filters={filters}
            collapsed={collapsed_cson}
            editMode={editMode}
            deleteMovie={deleteMovie}
            images={images}
            collapseFunction={() => {
              collapsed_cson
              ? setCollapsed_cson(false)
              : setCollapsed_cson(true)
            }}
          />
        </>
      ) : (
        ""
      )}
    </div>
  )
}
