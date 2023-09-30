export function SwitchModeButton({editMode, handleClick, images}) {
  return (
    <button className="edit-mode-button" onClick={handleClick}>
      {!editMode ? (
        <img title="edit mode" alt="E" src={images.icons['edit-icon']} />
        ) : (
          <img title="exit edit mode" alt="!E" src={images.icons['no-edit-icon']} />
          
      )}
    </button>
  )
}
