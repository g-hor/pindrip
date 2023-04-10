import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import Avatar from '../Profile/Avatar';
import './CreatePin.css';


const CreatePinForm = () => {
  const currentUser = useSelector(getCurrentUser);

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
            <textarea
              type="text"
              id="create-pin-title"
              placeholder='Add your title'
              />

            <div id="create-pin-user-info">
              <Avatar avatar={currentUser.avatar} />
              <div>{currentUser.firstName + ' ' + (currentUser.lastName || '')}</div>
            </div>

            <textarea
              id="create-pin-description"
              placeholder="Tell everyone what your Pin is about"
              >
              
            </textarea>

            <div id="add-alt-text-btn">
              Add alt text
            </div>

            <input
              type="text"
              placeholder="Add a destination link"
              />
          </div>

        </div>

      </div>

    </div>
  );
};

export default CreatePinForm;