import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import Avatar from '../Profile/Avatar';
import './CreatePin.css';
import { useState } from "react";


const CreatePinForm = () => {
  const currentUser = useSelector(getCurrentUser);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [website, setWebsite] = useState('');
  const [showAlt, setShowAlt] = useState(false);

  return (
    <div id="create-pin-main-bg">

      <div id="create-pin-content-bg">
        <div id="create-pin-top-btn-holder">

          <div id="ellipsis-btn">
            <i className="fa-solid fa-ellipsis" />
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
            <div id="cowboy">🤠</div>
            <textarea
              type="text"
              id="create-pin-title"
              placeholder='Add your title'
              onChange={(e) => setTitle(e.target.value)}
              />

            <div id="create-pin-user-info">
              <Avatar avatar={currentUser.avatar} />
              <div>{currentUser.firstName + ' ' + (currentUser.lastName || '')}</div>
            </div>

            <span
              contentEditable
              role="textbox"
              id="create-pin-description"
              placeholder="Tell everyone what your Pin is about" // This line is a no-op, see corresponding CSS file for 'content'
              onChange={(e) => setDescription(e.target.value)}
              />

            <div id="alt-btn-or-text">

              {!showAlt && (
                <div 
                  id="add-alt-text-btn"
                  onClick={() => setShowAlt(true)}
                  >
                  Add alt text
                </div>
                )}

              {showAlt && (
                <span
                  contentEditable
                  role="textbox"
                  id="alt-text-textbox"
                  placeholder="Explain what people can see in the Pin" // This line is a no-op, see corresponding CSS file for 'content'
                  onChange={(e) => {if (altText.length < 500) setAltText(e.target.value)}}
                  />
                )}

            </div>

            <textarea
              type="text"
              id="pin-website"
              placeholder="Add a destination link"
              onChange={(e) => setWebsite(e.target.value)}
              />
          </div>

        </div>

      </div>

    </div>
  );
};

export default CreatePinForm;