import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../store/session";
import { deletePin, fetchPin } from "../../store/pin";
import { getInitial } from "../../store/user";
import { fetchAllBoards } from "../../store/board";
import { removeBoardPin, savePin } from "../../store/boardPin";
import { Modal } from "../../context/modal";
import Avatar from "../Profile/Avatar";
import EditPinForm from "./EditPinForm";
import './PinShow.css';



const PinShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pinId } = useParams();
  const pins = useSelector(state => state?.pins);
  const pin = pins[parseInt(pinId)];
  const creator = useSelector(state => state?.users[pin?.creator]);
  const currentUser = useSelector(getCurrentUser);
  const boards = useSelector(state => Object.values(state?.boards));
  const [showDrop, setShowDrop] = useState(false);
  const [showBoards, setShowBoards] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [saved, setSaved] = useState(false);
  const [clickedSave, setClickedSave] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]?.name || 'All');
  let boardId = boards?.filter(board => board?.name === selectedBoard)[0]?.id;
  let background = useRef();
  let dropdown = useRef();
  let boardMenu = useRef();
  let initial;
  let dropMenu;

  
  const hideDrop = (e) => {
    if (dropdown?.current?.contains(e.target)) return;
    setShowDrop(false);
  };

  const hideBoards = (e) => {
    if (e.target === boardMenu?.current) return;
    setShowBoards(false); 
  };

  const goHome = (e) => {
    if (e.target !== background?.current) return;
    navigate(-1);
  };

  const clickBoard = (board) => {
    setSelectedBoard(board.name); 
    setClickedSave(false);
    setShowBoards(false);
    defineDropMenu();
  };

  const submitSave = async (boardId, pinId) => {
    if (!clickedSave) {
      setClickedSave(true);
      const res = await dispatch(savePin({ boardId, pinId }));
      if (res?.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    }
  };

  const submitRemoval = async () => {
    const res = await dispatch(removeBoardPin({ boardId, pinId })); 
    if (res?.ok) {
      defineDropMenu();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const defineDropMenu = () => {
    if ((currentUser?.username === creator?.username) && (boards?.filter(board => board?.name === selectedBoard)[0]?.savedPins?.includes(parseInt(pinId)))) {
      dropMenu = 
        <ul>
          <li 
            className="show-pin-drop-option"
            onClick={() => setShowEdit(true)}
            >
            Edit Pin
          </li>
          <li
            className="show-pin-drop-option"
            onClick={() => submitRemoval()}
            >
            Remove Pin
          </li>
          <li 
            className="show-pin-drop-option"
            onClick={() => {dispatch(deletePin(pin.id)); navigate(-1)}}
            >
            Delete Pin
          </li>
        </ul>
    } else if ((currentUser?.username === creator?.username) && !(boards?.filter(board => board?.name === selectedBoard)[0]?.savedPins?.includes(parseInt(pinId)))) {
      dropMenu = 
      <ul>
        <li 
          className="show-pin-drop-option"
          onClick={() => setShowEdit(true)}
          >
          Edit Pin
        </li>
        <li 
          className="show-pin-drop-option"
          onClick={() => {dispatch(deletePin(pin.id)); navigate(-1)}}
          >
          Delete Pin
        </li>
      </ul>
    } else if ((currentUser?.username !== creator?.username) && (boards?.filter(board => board?.name === selectedBoard)[0]?.savedPins?.includes(parseInt(pinId)))) {
      dropMenu = 
      <ul>
        <li
          className="show-pin-drop-option"
          onClick={() => submitRemoval()}
          >
          Remove Pin
        </li>
      </ul>
    } else {
      dropMenu = null;
    }
  };
  

  useEffect(() => {
    if (pin?.id) dispatch(fetchPin(pin?.id));
    dispatch(fetchAllBoards(currentUser?.id));
  }, [dispatch, showEdit, pin?.id, currentUser?.id]);
  
  
  useEffect(() => {
    if (!showDrop) return;
    
    document.addEventListener('click', hideDrop);
    document.addEventListener('click', goHome);

    return () => {
      document.removeEventListener('click', goHome);
      document.removeEventListener('click', hideDrop);
    };
  });

  useEffect(() => {
    if (!showBoards) return;

    document.addEventListener('click', hideBoards);

    return () => (document.removeEventListener('click', hideBoards));
  });

  useEffect(() => {
    defineDropMenu();
  })


  if (creator) { initial =  getInitial(creator) };
  defineDropMenu();

  return (
    <>
    {pin && (
      <div 
        ref={background}
        id="show-page" 
        onClick={goHome}
        >

        <div id="pin-show-container" >

          <div id="pin-show-img-container" >
            <img 
              src={pin?.photo} 
              alt={pin?.altText} 
              id="pin-show-img"
              />
          </div>

          <div id="pin-info-container" >
            <div>
              <div id="pin-show-top-bar">
                {dropMenu ? (
                  <div 
                    id="ellipsis-btn"
                    onClick={() => setShowDrop(true)}
                    >
                    <i className="fa-solid fa-ellipsis" />
                    {showDrop && (
                      <div id="pin-show-drop" ref={dropdown}>
                        {dropMenu}
                      </div>
                    )}
                  </div>
                ) : (
                  <div />
                )}
                
                {showEdit && (
                  <Modal 
                    onClose={() => setShowEdit(false)} 
                    customClass="edit-pin"
                    >
                    <EditPinForm 
                      pin={pin} 
                      onClose={() => setShowEdit(false)}
                      />
                  </Modal>
                )}

                <div id="show-board-drop-save-btn-holder">
                  <div id="show-pin-board-dropdown-btn" onClick={() => setShowBoards(true)}>
                    <i className="fa-solid fa-chevron-down dropbtn board-drop" />
                    <div id="board-first-option">
                      {selectedBoard}
                    </div>

                    {showBoards && (
                      <div id="board-options-menu" ref={boardMenu}>
                        <div id="board-options">All boards</div>
                        {boards?.map((board, i) => (
                          <div 
                            className="board-dropdown-option" 
                            key={i}
                            onClick={() => clickBoard(board)}
                            >
                            <img className="board-dropdown-thumbnail" src={pins[board.savedPins[0]].photo} alt="" />
                            <div className="board-dropdown-info">
                              {board.name}
                            </div>
                          </div>
                        ))}
                      </div>
                      )}
                  </div>

                  <div 
                    id="show-pin-save-btn"
                    onClick={() => submitSave(boardId, pinId)}
                    >
                    {clickedSave ? "Saved" : "Save"}
                  </div>
                </div>
              </div>

              <div id="pin-show-website">
                <a href="https://github.com/g-hor/pindrip" target="_blank" rel="noreferrer">{pin?.website}</a>
              </div>

              <div id="pin-show-title">
                {pin?.title}
              </div>

              <div id="pin-show-description">
                {pin?.description}
              </div>
            </div>

            <div id="pin-show-creator-info">
              <div id="create-pin-user-info">
                <Link to={`/${creator?.username}`}>
                  {creator?.avatar && (
                      <Avatar avatar={creator?.avatar} />
                    )}

                  {!creator?.avatar && (
                      <div id="pin-show-creator-initial">{initial}</div>
                    )}
                </Link>
                
                <Link to={`/${creator?.username}`}>
                  <div>{creator?.firstName + ' ' + (creator?.lastName || '')}</div>
                </Link>
              </div>
            </div>

          </div>

          <div id="saved-msg-container" className={saved ? "saved save-pin-show" : "save-pin-show"}>
            Drip saved successfully!
          </div>
        </div>

      </div>
      )}
    </>
  )
};

export default PinShow;
