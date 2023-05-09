import { useSelector } from "react-redux";
import PinIndexItem from "./PinIndexItem";
import './PinIndex.css';


const PinIndex = () => {
  const pins = useSelector(state => Object.values(state.pins));

  return (
    <>
      <div id="pins-index-page">
        <div id="pins-index-container">
          {pins.map((pin, i) => 
            <div className="pin-index-item" key={i}>
              <PinIndexItem pin={pin} />
            </div> 
            )}
        </div>

      </div>
    </>
  )
};

export default PinIndex;