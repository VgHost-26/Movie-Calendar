import React from "react"

export function ExpandButton({children: value, onClick, hidden }) {
  return (
    <button
      className="expand-button"
      is-hidden={String(hidden)}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
