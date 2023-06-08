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
  const boards = useSelector(state => 
    Object.values(state?.boards)
      .slice(0, 1)
      .concat(
        Object.values(state?.boards)
          .slice(1)
          .reverse()
      )
    );
  const [showDrop, setShowDrop] = useState(false);
  const [showBoards, setShowBoards] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [saved, setSaved] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [isSaved, setIsSaved] = useState(boards?.map(board =>
    board.savedPins.includes(parseInt(pin?.id))
  ));
  const [showSaveBtn, setShowSaveBtn] = useState(isSaved);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]?.name || 'All Pins');
  let boardId = boards?.filter(board => board?.name === selectedBoard)[0]?.id;
  let boardIndex = boards.indexOf(boards?.filter(board => board?.name === selectedBoard)[0]);
  let background = useRef();
  let dropdown = useRef();
  let boardMenu = useRef();
  let initial;
  let dropMenu;


  const abbreviateBoard = (boardName, length) => {
    if (boardName.length > length) {
      return boardName.slice(0, length) + '...';
    } else {
      return boardName;
    }
  };
  
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
    setShowSaveBtn(isSaved);
    setShowSaveBtn(prev => {
      const next = [ ...prev ];
      isSaved[boardIndex] ? next[boardIndex] = true : next[boardIndex] = false;
      return next;
    });
    setShowBoards(false);
  };

  const submitSave = async (boardId, pinId, boardIdx) => {
    if (!isSaved[boardIdx]) {
      setIsSaved(prev => {
        const next = [ ...prev ];
        next[boardIdx] = true;
        return next;
      });
      const res = await dispatch(savePin({ boardId, pinId }));
      if (res?.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } else {
      const res = await dispatch(removeBoardPin({ boardId, pinId }));
      if (res?.ok) {
        setIsSaved(prev => {
          const next = [ ...prev ];
          next[boardIdx] = false;
          return next;
        });
        defineDropMenu();
        setRemoved(true);
        setTimeout(() => setRemoved(false), 3000);
      }
    }
  };

  const submitRemoval = async () => {
    const res = await dispatch(removeBoardPin({ boardId, pinId })); 
    if (res?.ok) {
      defineDropMenu();
      setRemoved(true);
      setTimeout(() => setRemoved(false), 3000);
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
                      {abbreviateBoard(selectedBoard, 8)}
                    </div>

                    {showBoards && (
                      <div id="board-options-menu" ref={boardMenu}>
                        <div id="board-options-title">All boards</div>

                        <div id="board-options-container">
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
                                if (isSaved[i]) return next;
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
                                <div className="board-dropdown-name-holder">
                                  <div>
                                  {abbreviateBoard(board.name, 15)}
                                  </div>
                                  {board.savedPins.includes(parseInt(pinId)) && 
                                    <div>Saved here already</div>
                                    }
                                </div>
                                {(showSaveBtn[i] || isSaved[i]) && (
                                  <div 
                                    id="show-pin-save-btn"
                                    className={isSaved[i] ? "saved" : " "}
                                    onClick={() => submitSave(board?.id, pinId, i)}
                                    >
                                    {isSaved[i] ? "Saved" : "Save"}
                                  </div>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}
                  </div>

                  <div 
                    id="show-pin-save-btn"
                    className={isSaved[boardIndex] ? "saved" : " "}
                    onClick={() => submitSave(boardId, pinId, boardIndex)}
                    >
                    {isSaved[boardIndex] ? "Saved" : "Save"}
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
          
          <div id="saved-msg-container" className={removed ? "saved save-pin-show" : "save-pin-show"}>
            Drip removed successfully!
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
