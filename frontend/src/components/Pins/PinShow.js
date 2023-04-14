import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../store/session";
import { deletePin, fetchPin, removePin } from "../../store/pin";
import { getInitial } from "../../store/user";
import { fetchAllBoards } from "../../store/board";
import { savePin } from "../../store/boardPin";
import { Modal } from "../../context/modal";
import Avatar from "../Profile/Avatar";
import EditPinForm from "./EditPinForm";
import './PinShow.css';



const PinShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);
  const creator = useSelector(state => state.users[pin?.creator]);
  const currentUser = useSelector(getCurrentUser);
  const boards = useSelector(state => Object.values(state?.boards))
  const [showDrop, setShowDrop] = useState(false);
  const [showBoards, setShowBoards] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(boards[1]?.name || 'All Pins');
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
  const submitSave = async () => {
    return savePin({ boardId, pinId });
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

    document.addEventListener('click', hideBoards)

    return () => (document.removeEventListener('click', hideBoards))
  })


  
  if (currentUser?.username === creator?.username) {
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
          onClick={() => {dispatch(deletePin(pin.id)); navigate('/home')}}
          >
          Delete Pin
        </li>
      </ul>
  } else {
    dropMenu = 
      <ul>
        <li 
          className="show-pin-drop-option"
          onClick={() => {dispatch(removePin(pin.id)); navigate('/home')}}
          >
          Hide Pin
        </li>
      </ul>
  }

  if (creator) { initial =  getInitial(creator) };


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

            <div id="pin-show-top-bar">
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
                  onClick={submitSave}
                  >
                  Save
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

        </div>

      </div>
      )}
    </>
  )
};

export default PinShow;
