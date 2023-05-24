import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "../Profile/Avatar";

const PinIndexItem = ({ pin }) => {
  const { username } = useParams();
  const avatar = useSelector(state => state?.users[pin?.creator]?.avatar);
  const pinImg = useRef();

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
              <Avatar avatar={avatar} />
              {pin?.creator}
          </Link>
        </div>
      )}
    </>
  )
};

export default PinIndexItem;