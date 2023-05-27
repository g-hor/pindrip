import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { createPin } from "../../store/pin";
import { savePin } from "../../store/boardPin";
import { getInitial } from "../../store/user";
import { fetchAllBoards } from "../../store/board";
import Avatar from '../Profile/Avatar';
import './CreatePin.css';


const CreatePinForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const pins = useSelector(state => state?.pins);
  const boards = useSelector(state => 
    Object.values(state?.boards)
      .slice(0, 1)
      .concat(
        Object.values(state?.boards)
          .slice(1)
          .reverse()
      )
    );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [website, setWebsite] = useState('');
  const [showAlt, setShowAlt] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [showBoards, setShowBoards] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]?.name || 'All Pins');
  const [clickedSave, setClickedSave] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(Array(boards?.length).fill(false));
  const [saved, setSaved] = useState(false);
  const [noPicture, setNoPicture] = useState(false);
  const boardId = boards?.filter(board => board?.name === selectedBoard)[0]?.id;
  const uploadInput = useRef();
  const boardMenu = useRef();
  let displayInitial;


  const abbreviateBoard = (boardName, length) => {
    if (boardName.length > length) {
      return boardName.slice(0, length) + '...';
    } else {
      return boardName;
    }
  };

  const clickBoard = (board) => {
    setShowSaveBtn(Array(boards?.length).fill(false));
    setSelectedBoard(board.name);
    setShowBoards(false);
  };

  const handlePhoto = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setNoPicture(false);
    }
  };

  const handleSubmit = async (boardId, boardIdx) => {
    if (!photoUrl) {
      setNoPicture(true);
      return;
    }
    if (!clickedSave) {
      setClickedSave(true);
      const pin = await dispatch(createPin({ title, description, altText, website, photo }));
      const pinId = Object.keys(pin)[0];
      const res = await dispatch(savePin({ boardId, pinId }));
      if (res?.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setTimeout(() => navigate(`/pins/${pinId}`), 3000);
      }
    }
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
  if (currentUser) displayInitial = getInitial(currentUser);

  return (
    <div id="create-pin-main-bg">

      <div id="create-pin-content-bg">
        <div id="create-pin-bottom-content-holder">

          <div 
            id="create-pin-left-container"
            className={noPicture ? "no-picture" : ""}
            >
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
                <div 
                  id="dropbox-text"
                  className={noPicture ? "no-picture" : ""}
                  >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <div>
                    {!noPicture ? 
                      "Click here to upload an image."
                      :
                      "An Image is required to create a Pin."
                      }
                  </div>
                </div>
              )}
            </div>

          </div>

          <div id="create-pin-right-container">
            <div id="create-pin-top-row">
              <div id="create-pin-top-btn-holder">
                <div id="show-pin-board-dropdown-btn" onClick={() => setShowBoards(true)}>
                  <i className="fa-solid fa-chevron-down dropbtn board-drop" />
                  <div id="board-first-option">
                    {abbreviateBoard(selectedBoard, 9)}
                  </div>

                  {showBoards && (
                    <div id="board-options-menu" ref={boardMenu}>
                      <div id="board-options">All boards</div>
                      {boards?.map((board, i) => (
                        <div 
                          className="board-dropdown-option" 
                          key={i}
                          onClick={() => clickBoard(board)}
                          onMouseEnter={() => setShowSaveBtn(prev => {
                            const next = [ ...prev ];
                            next[i] = true;
                            return next;
                          })}
                          onMouseLeave={() => setShowSaveBtn(prev => {
                            const next = [ ...prev ];
                            next[i] = false;
                            return next;
                          })}
                          >
                          <div className="board-dropdown-thumbnail-holder">
                            {pins[board.savedPins[0]]?.photo && (
                              <img className="board-dropdown-thumbnail" src={pins[board.savedPins[0]]?.photo} alt="" />
                              )}
                          </div>
                          <div className="board-dropdown-info">
                            <div>
                              {abbreviateBoard(board.name, 15)}
                            </div>
                            {showSaveBtn[i] && (
                              <div 
                                id="show-pin-save-btn"
                                className={clickedSave ? "saved" : " "}
                                onClick={() => handleSubmit(board.id, i)}
                                >
                                {clickedSave ? "Saved" : "Save"}
                              </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>

                <div 
                  id="show-pin-save-btn"
                  className={clickedSave ? "saved" : " "}
                  onClick={() => handleSubmit(boardId)}
                  >
                  {clickedSave ? "Saved" : "Save"}
                </div>

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
              <Link to={`/${currentUser?.username}`}>
                {currentUser?.avatar && (
                    <Avatar avatar={currentUser?.avatar} />
                  )}

                {!currentUser?.avatar && (
                    <div id="pin-show-creator-initial">{displayInitial}</div>
                  )}
              </Link>
              
              <Link to={`/${currentUser?.username}`}>
                <div>{currentUser?.firstName + ' ' + (currentUser?.lastName || '')}</div>
              </Link>
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
                  onInput={(e) => {if (altText?.length < 500) setAltText(e.target.value)}}
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

      <div id="saved-msg-container" className={saved ? "saved save-pin" : "save-pin"}>
        Drip saved successfully!
      </div>
    </div>
  );
};

export default CreatePinForm;