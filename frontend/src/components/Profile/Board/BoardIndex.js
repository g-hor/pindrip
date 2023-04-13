import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../../store/board";
import BoardIndexItem from "./BoardIndexItem";
import './BoardIndex.css';
import { useNavigate } from "react-router-dom";



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
    </div>
  );
};

export default BoardIndex;
