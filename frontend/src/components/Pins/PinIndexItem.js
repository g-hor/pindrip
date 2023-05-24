import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "../Profile/Avatar";
import { getInitial } from "../../store/user";

const PinIndexItem = ({ pin }) => {
  const { username } = useParams();
  const showUser = useSelector(state => state?.users[pin?.creator]);
  const avatar = showUser?.avatar;
  const pinImg = useRef();
  let initial;

  if (showUser) {
    initial = getInitial(showUser)
  };

  return (
    <>
      <Link 
        to={`/pins/${pin?.id}`}
        >
        <img 
          src={pin?.photo} 
          alt={pin?.altText} 
          className="pin-index-img"
          ref={pinImg}
          />
        {!username && (
          <div className="home-pin-title">
            {pin?.title}
          </div>
        )}
      </Link>

      {!username && (
        <div className="home-pins-info">
          <Link
            to={`/${pin?.creator}`}
            >
              {avatar ? (
                <Avatar avatar={avatar} />
              ) : (
                <div id="pin-show-creator-initial">{initial}</div>
              )}
              <span>
                {pin?.creator}
              </span>
          </Link>
        </div>
      )}
    </>
  )
};

export default PinIndexItem;