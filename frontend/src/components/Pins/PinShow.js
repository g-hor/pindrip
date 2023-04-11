import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './PinShow.css';


const PinShow = () => {
  debugger
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);

  return (
    <div id="pin-show-container">

      <div id="pin-show-img">
        <img src={pin?.photo} alt={pin?.altText} />
      </div>

      <div id="pin-info-container">

      </div>

    </div>
  )
};

export default PinShow;
