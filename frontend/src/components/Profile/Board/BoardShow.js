import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../../store/board";

const BoardShow = () => {
  const dispatch = useDispatch();
  const { username, boardUrl } = useParams();
  const showUser = useSelector(state => state.users[username]);
  const currentBoard = useSelector(state => state.boards[boardUrl]);

  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [dispatch, showUser]);

  return (
    <div id="board-show-page" style={{"fontSize": "100px"}}>
      {currentBoard?.name}
    </div>
  )
};

export default BoardShow;