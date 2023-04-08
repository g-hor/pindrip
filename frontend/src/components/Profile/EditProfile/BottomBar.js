


const BottomBar = ({ resetChanges, saveChanges }) => {

  return (
    <div id="edit-page-bottom-bar">
      <div id="edit-bottom-btn-holder">

        <div
          className="bottom-profile-btn"
          onClick={resetChanges}
          >
          Reset
        </div>

        <div
          className="bottom-profile-btn"
          onClick={saveChanges}
          >
          Save
        </div>

      </div>
    </div>
  )
};

export default BottomBar;