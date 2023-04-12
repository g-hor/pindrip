import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { getInitial } from "../../store/user";
import Avatar from "../Profile/Avatar";
import './PinShow.css';


const PinShow = () => {
  const navigate = useNavigate();
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);
  const creator = useSelector(state => state.users[pin?.creator]);
  let background = useRef();


  const goHome = (e) => {
    if (!background?.current?.contains(e.target)) navigate('/');
  };


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
              <div id="ellipsis-btn">
                <i className="fa-solid fa-ellipsis" />
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
                {creator?.avatar && (
                    <Avatar avatar={creator?.avatar} />
                  )}

                {!creator?.avatar && (
                    <div id="pin-show-creator-initial">{getInitial(creator)}</div>
                  )}
                
                <div>{creator?.firstName + ' ' + (creator?.lastName || '')}</div>
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
