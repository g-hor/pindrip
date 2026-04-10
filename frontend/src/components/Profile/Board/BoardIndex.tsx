import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBoard, fetchAllBoards } from "../../../store/board";
import BoardIndexItem from "./BoardIndexItem";
import { Modal } from "../../../context/modal";
import './BoardIndex.css';
import { getCurrentUser } from "../../../store/session";



const BoardIndex = ({ showUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [canSave, setCanSave] = useState(false);
  let canEdit = (showUser?.id === currentUser?.id);
  const dropdown = useRef();
  const boardsContainer = useRef();
  const [containerWidth, setContainerWidth] = useState(boardsContainer?.current?.offsetWidth);
  const [rowAmt, setRowAmt] = useState(parseInt(containerWidth / 252))
  const [fillerAmt, setFillerAmt] = useState(rowAmt - (boards.length % rowAmt));
  const [fillers, setFillers] = useState([]);
  
  
  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setError("Your board name can't be empty!");
      setCanSave(false);
    } else if (e.target.value.length > 50) {
      setError('Please enter no more than 50 characters.');
      setCanSave(false);
    } else {
      setError('');
      setCanSave(true);
    }
  }
  
  const handleCreate = async () => {
    if (canSave) {
      const res = await dispatch(createBoard({name}));
      if (res?.ok) setShowModal(false);
    }
  };


  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [dispatch, showUser?.id]);
  
  useEffect(() => {
    if (!showDrop) return;
    
    const clickHide = (e) => {
      if (dropdown?.current?.contains(e.target)) return;
      setShowDrop(false);
    };
    
    document.addEventListener('click', clickHide);
    
    return () => document.removeEventListener('click', clickHide);
  }, [showDrop])
  
  useEffect(() => {
    const resize = () => setContainerWidth(boardsContainer?.current?.offsetWidth);
    
    window.addEventListener('resize', resize);
    
    return () => document.removeEventListener('resize', resize);
  }, [])

  useEffect(() => {
    if (boardsContainer?.current) {
      setContainerWidth(boardsContainer?.current?.offsetWidth);
    }
    if (containerWidth) {
      setRowAmt(parseInt(containerWidth / 252));
    }
    if (rowAmt) {
      setFillerAmt(rowAmt - (boards?.length % rowAmt));
    }
    if (fillerAmt) {
      if (fillerAmt === rowAmt) setFillers([]);
      else setFillers(Array(fillerAmt).fill('filler'));
    }
  }, [boardsContainer, boards?.length, containerWidth, fillerAmt, rowAmt])
  
  
  if (!showUser) return null;


  return (
    <div id="boards-container" ref={boardsContainer}>
      {canEdit && (
        <div id="plus-sign-holder" onClick={() => setShowDrop(true)} >
          <i className="fa-solid fa-plus" />
        </div> 
        )}
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
        <BoardIndexItem board={board} showUser={showUser} key={i} />
      ))}

      {fillers.map((filler, i) => <div className="filler-board" key={i} />)}

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
                  className="edit-pin-text-input board-input"
                  placeholder='Like "Outfit Ideas" or "Drip Goals"'
                  onChange={handleName}
                  />
              </div>

              {error.length !== 0 && (
                  <div className="edit-board-error">
                  {error}
                </div>
                )}

              <div id="create-board-bottom-bar">
                <div 
                  id="create-board-modal-btn"
                  onClick={handleCreate}
                  className={canSave ? "can-save" : ""}
                  >
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
