
const BottomBar = ({ resetChanges, saveChanges }) => {

  return (
    <div id="edit-page-bottom-bar">
      <div id="bottom-bar-align-holder">

        <div id="bottom-bar-placeholder" />

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
    </div>
  )
};

export default BottomBar;