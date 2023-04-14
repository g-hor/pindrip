import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BoardIndexItem = ({ board, showUser }) => {
  const allPinPhotos = useSelector(state => Object.values(state?.pins).map(pin => pin?.photo))

  return (
      <div className="board-item">
        <div className="board-img-holder">
          <Link to={`/${showUser?.username}/${board?.boardUrl}`}>
            <div className="first-img">
              <img src={allPinPhotos[board?.savedPins[0] - 1] || ''} alt="" />
            </div>
          </Link>
          <Link to={`/${showUser?.username}/${board?.boardUrl}`}>
            <div className="second-img-holder">
              <div className="secondary-img">
                <img src={allPinPhotos[board?.savedPins[1] - 1] || ''} alt="" />
              </div>
              <div className="tertiary-img">
                <img src={allPinPhotos[board?.savedPins[2] - 1] || ''} alt="" />
              </div>
            </div>
          </Link>
        </div>

        <div className="board-info">
          <div className="board-name">
            <Link to={`/${showUser?.username}/${board?.boardUrl}`}>
              {board?.name}
            </Link>
          </div>
          
          <div className="board-pin-count">
            {board?.count || '0'} Pins
          </div>
        </div>
      </div>
  );
};

export default BoardIndexItem;