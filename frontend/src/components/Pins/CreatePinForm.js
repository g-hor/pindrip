import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { useState, useRef } from "react";
import { createPin } from "../../store/pin";
import { useNavigate } from "react-router-dom";
import Avatar from '../Profile/Avatar';
import './CreatePin.css';
import { useEffect } from "react";
import { fetchAllBoards } from "../../store/board";


const CreatePinForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const boards = useSelector(state => Object.values(state?.boards));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [website, setWebsite] = useState('');
  const [showAlt, setShowAlt] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [showBoards, setShowBoards] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(boards[1]?.name || 'All Pins');
  const uploadInput = useRef();
  let boardMenu = useRef();


  const handlePhoto = async ({ currentTarget }) => {

    if (currentTarget.files[0]) {
      setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
    }
  };

  const handleSubmit = async () => {
    const pin = await dispatch(createPin({ title, description, altText, website, photo }));
    const pinId = Object.keys(pin)[0];
    navigate(`/pins/${pinId}`);
  };

  const hideBoards = (e) => {
    if (e.target === boardMenu?.current) return;
    setShowBoards(false); 
  };

  useEffect(() => {
    dispatch(fetchAllBoards(currentUser?.id));
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    if (!showBoards) return;

    document.addEventListener('click', hideBoards)

    return () => (document.removeEventListener('click', hideBoards))
  })

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-pin-img" alt="" />;


  return (
    <div id="create-pin-main-bg">

      <div id="create-pin-content-bg">
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
            <div id="create-pin-top-btn-holder">
              <div id="show-pin-board-dropdown-btn" onClick={() => setShowBoards(true)}>
                <i className="fa-solid fa-chevron-down dropbtn board-drop" />
                <div id="board-first-option">
                  {selectedBoard}
                </div>

                {showBoards && (
                  <div id="board-options-menu" className="create-pin-drop-bg" ref={boardMenu}>
                    {boards?.map((board, i) => (
                      <div 
                        className="board-dropdown-option" 
                        key={i}
                        onClick={() => {setSelectedBoard(board.name); setShowBoards(false)}}
                        >
                        {board.name}
                      </div>
                    ))}
                  </div>
                  )}
              </div>

              <div 
                id="show-pin-save-btn"
                onClick={handleSubmit}
                >
                Save
              </div>

            </div>

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
              onInput={(e) => setDescription(e.currentTarget.textContent)}
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
                  onInput={(e) => {if (altText.length < 500) setAltText(e.target.value)}}
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