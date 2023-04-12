import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPins } from "../../store/pin";
import PinIndexItem from "./PinIndexItem";
import './PinIndex.css';


const PinIndex = () => {
  const dispatch = useDispatch();
  const pins = useSelector(state => Object.values(state.pins));

  useEffect(() => {
    dispatch(fetchAllPins());
  }, [dispatch]);

  return (
    <div id="pins-index-page">
      <div id="pins-index-container">
        {pins.map((pin) => 
          <div className="pin-index-item">
            <PinIndexItem 
              pin={pin} 
              key={pin.id} 
              />
          </div> 
          )}
      </div>
    </div>
  )
};

export default PinIndex;