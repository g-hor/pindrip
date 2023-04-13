import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../../store/board";
import { useParams } from "react-router-dom";


const BoardIndex = ({ showUser }) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state?.boards)

  useEffect(() => {
    dispatch(fetchAllBoards(showUser?.id));
  }, [showUser]);


  if (!showUser) return null;

  return (
    <div>
      
    </div>
  );
};

export default BoardIndex;
