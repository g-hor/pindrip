import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../../store/board";
import Avatar from "../Avatar";
import PinIndexItem from "../../Pins/PinIndexItem";
import { Modal } from "../../../context/modal";
import './BoardShow.css';

const BoardShow = () => {
  const dispatch = useDispatch();
  const { username, boardUrl } = useParams();
  const showUser = useSelector(state => state?.users[username]);
  const currentBoard = useSelector(state => state?.boards[boardUrl]);
  const pins = useSelector(state => state?.pins);
  const boardPins = currentBoard?.savedPins.map(pinId => pins[pinId])
  const [name, setName] = useState(currentBoard?.name);
  const [description, setDescription] = useState(currentBoard?.description)
  const [showDrop, setShowDrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdown = useRef();

  const hideDrop = (e) => {
    if (dropdown?.current?.contains(e.target)) return;
    setShowDrop(false);
  };

  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [dispatch, showUser]);

  useEffect(() => {
    if (!showDrop) return;

    document.addEventListener('click', hideDrop);
    
    return () => document.removeEventListener('click', hideDrop);
  });

  return (
    <div id="board-show-page">
      <div id="board-show-title">
        <div>
          {currentBoard?.name}
        </div>
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
                  value={currentBoard?.description}
                  />
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

      <Avatar avatar={showUser?.avatar} />

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