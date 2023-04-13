import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../../store/board";
import { useNavigate } from "react-router-dom";
import BoardIndexItem from "./BoardIndexItem";
import { Modal } from "../../../context/modal";
import './BoardIndex.css';



const BoardIndex = ({ showUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector(state => Object.values(state?.boards))
  const [showDrop, setShowDrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdown = useRef();


  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [dispatch, showUser]);

  useEffect(() => {
    if (!showDrop) return;

    const clickHide = (e) => {
      if (dropdown?.current?.contains(e.target)) return;
      setShowDrop(false);
    };

    document.addEventListener('click', clickHide);

    return () => document.removeEventListener('click', clickHide);
  }, [showDrop])

  if (!showUser) return null;

  return (
    <div id="boards-container">
      <div id="plus-sign-holder" onClick={() => setShowDrop(true)} >
        <i className="fa-solid fa-plus" />
      </div>
      {showDrop && (
        <div id="profile-create-dropdown" ref={dropdown} >
          <div id="create-text">
            Create
          </div>
          <div 
            className="create-option" 
            id="create-pin-btn"
            onClick={() => navigate('/pin-builder')}
            >
            Pin
          </div>
          <div 
            className="create-option" 
            id="create-board-btn"
            onClick={() => setShowModal(true)}
            >
            Board
          </div>
        </div>
        )}
      {boards.map((board, i) => (
        <BoardIndexItem board={board} key={i} />
      ))}


      {showModal && (
        <Modal onClose={() => setShowModal(false)} customClass={"create-board-modal"}>
          <div id="create-board-form">
            <div id="create-board-title">
              Create board
            </div>
            <div id="create-board-row-holder">
              <div id="create-board-name-label">
                Name
              </div>
              <div>
                <input
                  type="text"
                  placeholder='Like "Edgy drip!" or "Future Outfits"'
                  className="edit-pin-text-input board-input"
                  />
              </div>

              <div id="create-board-bottom-bar">
                <div id="create-board-modal-btn">
                  Create
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BoardIndex;