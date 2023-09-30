export function ChangeMonthButton({ direction = "r", handleClick, images }) {
  return (
    <button
      className={"month-button " + direction}
      direction={direction}
      onClick={e => handleClick(direction)}
    >
      {direction === "r" ? (
        <img src={images.icons['angle-right-solid']}/>
        ) : direction === "l" ? (
          <img src={images.icons['angle-left-solid']}/>
          ) : (
            <img src={images.icons['clock-rotate-left-solid']}/>
      )}
    </button>
  )
}
