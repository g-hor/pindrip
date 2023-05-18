import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard, fetchAllBoards, updateBoard } from "../../../store/board";
import { getCurrentUser } from "../../../store/session";
import { Modal } from "../../../context/modal";
import Avatar from "../Avatar";
import PinIndexItem from "../../Pins/PinIndexItem";
import './BoardShow.css';
import { getInitial } from "../../../store/user";


const BoardShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, boardUrl } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const showUser = useSelector(state => state?.users[username]);
  const currentBoard = useSelector(state => state?.boards[boardUrl]);
  const pins = useSelector(state => state?.pins);
  const boardPins = currentBoard?.savedPins.map(pinId => pins[pinId])
  const [name, setName] = useState(currentBoard?.name || '');
  const [description, setDescription] = useState(currentBoard?.description || '');
  const [showDrop, setShowDrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let canEdit = (showUser?.id === currentUser?.id && currentBoard?.name !== 'All Pins');
  let displayInitial;
  const dropdown = useRef();

  const hideDrop = (e) => {
    if (dropdown?.current?.contains(e.target)) return;
    setShowDrop(false);
  };

  const saveEdits = async () => {
    const editedBoard = await dispatch(updateBoard({ id: currentBoard?.id, name, description }));
    setShowModal(false)
    navigate(`/${username}/${Object.keys(editedBoard)[0]}`)
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteBoard(currentBoard?.id));
    if (res.ok) navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [dispatch, showUser]);

  useEffect(() => {
    if (!showDrop) return;

    document.addEventListener('click', hideDrop);
    
    return () => document.removeEventListener('click', hideDrop);
  });

  useEffect(() => {
    if (currentBoard) {
      setName(currentBoard.name);

      if (currentBoard.description) {
        setDescription(currentBoard.description);
      }
    }
  }, [currentBoard]);


  if (showUser) displayInitial = getInitial(showUser);
  

  return (
    <div id="board-show-page">
      <div id="board-show-title">
        <div>
          {currentBoard?.name}
        </div>
        {canEdit && (
          <div 
            id="ellipsis-btn" 
            className="board-drop-ellipsis"
            onClick={() => setShowDrop(true)}
            >
            <i className="fa-solid fa-ellipsis" />
            {showDrop && (
              <div id="edit-board-drop-menu">
                <div id="board-options">
                  Board options
                </div>
                <div 
                  className="edit-board-menu-option"
                  onClick={() => setShowModal(true)}
                  >
                  Edit board
                </div>
              </div>
              )}
          </div>
          )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div id="edit-board-form">
            <div id="edit-board-form-title">
              Edit your board
            </div>
            <div className="edit-board-form-row">
              <div className="edit-board-form-label">
                Name
              </div>
              <div>
                <input
                  type="text"
                  className="edit-board-form-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>
            </div>
            <div className="edit-board-form-row">
              <div className="edit-board-form-label">
                Description
              </div>
              <div>
                <input
                  type="text"
                  className="edit-board-form-field"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's your board about?"
                  />
              </div>
              <div 
                className="edit-board-form-row delete-board"
                onClick={handleDelete}
                >
                <div id="delete-board-label">
                  Delete board
                </div>
                <div id="delete-board-description">
                  Delete this board and all its Pins forever. <br />
                  You can't undo this!
                </div>
              </div>
              <div id="edit-board-bottom-bar">
                <div 
                  id="edit-board-done-btn"
                  onClick={saveEdits}
                  >
                  Done
                </div>
              </div>
            </div>
          </div>
        </Modal>
        )}
  
      {currentBoard?.description && 
        <div id="board-show-description">
          {currentBoard?.description}
        </div>
        }
      
      <Link to={`/${username}`} >
        {showUser?.avatar && (
          <Avatar avatar={showUser?.avatar} />
        )}
        {!showUser?.avatar && (
          <div id="pin-show-creator-initial">{displayInitial}</div>
        )}
      </Link>

      <div id="board-show-count-bar">
        {currentBoard?.count} Pins
      </div>
      
      <div id="pins-index-container">
        {boardPins?.map((pin, i) => 
          <div className="pin-index-item" key={i}>
            <PinIndexItem pin={pin} />
          </div>
        )}
      </div>

    </div>
  )
};

export default BoardShow;