import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BoardIndexItem = ({ board }) => {
  const allPinPhotos = useSelector(state => Object.values(state?.pins).map(pin => pin?.photo))

  return (
    <Link to="#">
      <div className="board-item">
        <div className="board-img-holder">
          <div className="first-img">
            <img src={allPinPhotos[board?.savedPins[0]] || ''} alt="" />
          </div>
          <div className="second-img-holder">
            <div className="secondary-img">
              <img src={allPinPhotos[board?.savedPins[1]] || ''} alt="" />
            </div>
            <div className="tertiary-img">
              <img src={allPinPhotos[board?.savedPins[2]] || ''} alt="" />
            </div>
          </div>
        </div>

        <div className="board-info">
          <div className="board-name">
            {board?.name}
          </div>
          
          <div className="board-pin-count">
            {board?.count || 0} Pins
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoardIndexItem;