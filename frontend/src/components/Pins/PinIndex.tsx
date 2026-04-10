import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { fetchAllBoards } from "../../store/board";
import PinIndexItem from "./PinIndexItem";
import './PinIndex.css';


const PinIndex = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const pins = useSelector(state => Object.values(state.pins).reverse());


  useEffect(() => {
    dispatch(fetchAllBoards(currentUser?.id));
  }, [dispatch, currentUser?.id, username])


  return (
    <>
      <div id="pins-index-page">
        <div id="pins-index-container">
          {pins.map((pin, i) => 
            <div 
              className={!username ? "pin-index-item home-pin" : "pin-index-item"}
              key={i}
              >
              <PinIndexItem pin={pin} />
            </div> 
            )}
        </div>

      </div>
    </>
  )
};

export default PinIndex;