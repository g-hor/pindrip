import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../../store/board";
import './BoardIndex.css';
import { Link } from "react-router-dom";



const BoardIndex = ({ showUser }) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => Object.values(state?.boards))

  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [dispatch, showUser]);


  if (!showUser) return null;

  return (
    <div id="boards-container">
      <div id="plus-sign-holder">
        <i className="fa-solid fa-plus"></i>
      </div>
      {boards.map((board, i) => (
        <Link to="#" key={i} >
          <div className="board-item">
            <div className="board-img-holder">
              <div className="first-img">

              </div>
              <div className="second-img-holder">
                <div className="secondary-img">

                </div>
                <div className="tertiary-img">

                </div>
              </div>
            </div>

            <div className="board-info">
              <div className="board-name">
                {board?.name}
              </div>
              
              <div className="board-pin-count">
                0 Pins
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BoardIndex;
