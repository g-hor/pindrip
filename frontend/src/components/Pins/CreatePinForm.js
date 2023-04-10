import './CreatePin.css';

const CreatePinForm = () => {
  

  return (
    <div id="create-pin-main-bg">

      <div id="create-pin-content-bg">
        <div id="create-pin-top-btn-holder">

          <div id="ellipsis-btn">
            <i class="fa-solid fa-ellipsis" />
          </div>

          <div id="board-drop-save-btn-holder">
            <div id="create-pin-board-dropdown-btn">

            </div>
            <div id="create-pin-save-btn">
              Save
            </div>
          </div>

        </div>

        <div id="create-pin-bottom-content-holder">

          <div id="create-pin-left-container">
            <div id="create-pin-upload-box">

            </div>
          </div>

          <div id="create-pin-right-container">
            <input
              type="text"
              id="create-pin-title"
              placeholder='Add your title'
              />
          </div>

        </div>

      </div>

    </div>
  );
};

export default CreatePinForm;