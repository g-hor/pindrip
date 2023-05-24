import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PinIndexItem from "./PinIndexItem";
import './PinIndex.css';


const PinIndex = () => {
  const { username } = useParams();
  const pins = useSelector(state => Object.values(state.pins));

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