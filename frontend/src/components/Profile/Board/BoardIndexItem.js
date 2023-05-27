import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BoardIndexItem = ({ board, showUser }) => {
  let firstIdx = board?.savedPins[0];
  let secondIdx = board?.savedPins[1];
  let thirdIdx = board?.savedPins[2];
  const firstPhoto = useSelector(state => state?.pins[firstIdx]?.photo);
  const secondPhoto = useSelector(state => state?.pins[secondIdx]?.photo);
  const thirdPhoto = useSelector(state => state?.pins[thirdIdx]?.photo);


  return (
      <div className="board-item">
        <div className="board-img-holder">
          <Link to={`/${showUser?.username}/${board?.boardUrl}`}>
            <div className="first-img">
              <img src={firstPhoto || ''} alt="" />
            </div>
          </Link>
          <Link to={`/${showUser?.username}/${board?.boardUrl}`}>
            <div className="second-img-holder">
              <div className="secondary-img">
                <img src={secondPhoto || ''} alt="" />
              </div>
              <div className="tertiary-img">
                <img src={thirdPhoto || ''} alt="" />
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