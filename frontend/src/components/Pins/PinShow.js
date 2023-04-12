import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getInitial } from "../../store/user";
import Avatar from "../Profile/Avatar";
import './PinShow.css';
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../store/session";


const PinShow = () => {
  const navigate = useNavigate();
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);
  const creator = useSelector(state => state.users[pin?.creator]);
  const currentUser = useSelector(getCurrentUser);
  const [showDrop, setShowDrop] = useState();
  let background = useRef();
  let dropMenu;


  if (currentUser?.username === creator?.username) {
    dropMenu = 
      <div>

      </div>
  } else {
    dropMenu = 
      <div>
        
      </div>
  }

  const goHome = (e) => {
    if (e.target !== background?.current && background?.current?.contains(e.target)) return;
    navigate('/home');
  };
  
  useEffect(() => {

    document.addEventListener('click', goHome);

    return () => document.removeEventListener('click', goHome);
  });


  return (
    <>
    {pin && (
      <div 
        ref={background}
        id="show-page" 
        onClick={goHome}
        >

        <div id="pin-show-container" >

          <div id="pin-show-img-container" >
            <img 
              src={pin?.photo} 
              alt={pin?.altText} 
              id="pin-show-img"
              />
          </div>

          <div id="pin-info-container" >

            <div id="pin-show-top-bar">
              <div 
                id="ellipsis-btn"
                onClick={() => setShowDrop(true)}
                >
                <i className="fa-solid fa-ellipsis" />
                {showDrop && (
                  <div id="pin-show-drop">
                    {dropMenu}
                  </div>
                )}
              </div>

              <div id="show-board-drop-save-btn-holder">
                <div id="show-pin-board-dropdown-btn">
                  Board name
                </div>
                <div 
                  id="show-pin-save-btn"
                  // onClick={}
                  >
                  Save
                </div>
              </div>
            </div>

            <div id="pin-show-website">
              <a href={pin?.website}>{pin?.website}</a>
            </div>

            <div id="pin-show-title">
              {pin?.title}
            </div>

            <div id="pin-show-description">
              {pin?.description}
            </div>

            <div id="pin-show-creator-info">
              <div id="create-pin-user-info">
                <Link to={`/${creator?.username}`}>
                  {creator?.avatar && (
                      <Avatar avatar={creator?.avatar} />
                    )}

                  {!creator?.avatar && (
                      <div id="pin-show-creator-initial">{getInitial(creator)}</div>
                    )}
                </Link>
                
                <Link to={`/${creator?.username}`}>
                  <div>{creator?.firstName + ' ' + (creator?.lastName || '')}</div>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
      )}
    </>
  )
};

export default PinShow;
