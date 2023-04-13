import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../store/session";
import { deletePin, fetchPin, removePin } from "../../store/pin";
import { getInitial } from "../../store/user";
import Avatar from "../Profile/Avatar";
import { Modal } from "../../context/modal";
import './PinShow.css';
import EditPinForm from "./EditPinForm";


const PinShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);
  const creator = useSelector(state => state.users[pin?.creator]);
  const currentUser = useSelector(getCurrentUser);
  const [showDrop, setShowDrop] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  let background = useRef();
  let dropdown = useRef();
  let dropMenu;

  
  const hideDrop = (e) => {
    if (dropdown?.current?.contains(e.target)) return;
    setShowDrop(false);
  }
  const goHome = (e) => {
    if (e.target !== background?.current) return;
    navigate('/home');
  };

  
  useEffect(() => {
    dispatch(fetchPin(pin?.id));
  }, [dispatch, showEdit, pin?.id]);
  
  
  useEffect(() => {
    if (!showDrop) return;
    
    document.addEventListener('click', hideDrop)
    document.addEventListener('click', goHome);

    return () => {
      document.removeEventListener('click', goHome)
      document.removeEventListener('click', hideDrop)
    };
  });


  
  if (currentUser?.username === creator?.username) {
    dropMenu = 
      <ul>
        <li 
          className="show-pin-drop-option"
          onClick={() => setShowEdit(true)}
          >
          Edit Pin
        </li>
        <li 
          className="show-pin-drop-option"
          onClick={() => {dispatch(deletePin(pin.id)); navigate('/home')}}
          >
          Delete Pin
        </li>
      </ul>
  } else {
    dropMenu = 
      <ul>
        <li 
          className="show-pin-drop-option"
          onClick={() => {dispatch(removePin(pin.id)); navigate('/home')}}
          >
          Hide Pin
        </li>
      </ul>
  }


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
                  <div id="pin-show-drop" ref={dropdown}>
                    {dropMenu}
                  </div>
                )}
              </div>
              
              {showEdit && (
                <Modal 
                  onClose={() => setShowEdit(false)} 
                  customClass="edit-pin"
                  >
                  <EditPinForm 
                    pin={pin} 
                    onClose={() => setShowEdit(false)}
                    />
                </Modal>
              )}

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
              <a href="https://github.com/g-hor/pindrip">{pin?.website}</a>
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
