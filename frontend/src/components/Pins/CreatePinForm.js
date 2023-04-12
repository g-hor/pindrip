import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { useState, useRef } from "react";
import { createPin } from "../../store/pin";
import { useNavigate } from "react-router-dom";
import Avatar from '../Profile/Avatar';
import './CreatePin.css';


const CreatePinForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [website, setWebsite] = useState('');
  const [showAlt, setShowAlt] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const uploadInput = useRef();


  const handlePhoto = async ({ currentTarget }) => {

    if (currentTarget.files[0]) {
      setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
    }
  };

  const handleSubmit = async () => {
    const pin = dispatch(createPin({ title, description, altText, website, photo }));
    const pinId = Object.keys(pin)[0];
    navigate(`/pins/${pinId}`);
  };


  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-pin-img" alt="" />;


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
            <div 
              id="create-pin-save-btn"
              onClick={handleSubmit}
              >
              Save
            </div>
          </div>

        </div>

        <div id="create-pin-bottom-content-holder">

          <div id="create-pin-left-container">
            <div 
              id="create-pin-upload-box"
              onClick={() => uploadInput.current.click()}
              >
              <input
                ref={uploadInput}
                type="file"
                onChange={handlePhoto}
                style={{display: 'none'}}
                />
              {preview || (
                <div id="dropbox-text">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <div>Click here to upload an image</div>
                </div>
              )}
            </div>

          </div>

          <div id="create-pin-right-container">
            <div id="cowboy">🤠</div>
            <div id="relative-text-aligner">
              <textarea
                type="text"
                id="create-pin-title"
                placeholder='Add your title'
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

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