import React from 'react';
import { ReactSVG } from "react-svg";


export function DeleteButton({handleClick}) {
  return (
    <button
      className="delete-button"
      onClick={handleClick}
    >
      X
    </button>
  )
}
