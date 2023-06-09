import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { capitalizeFirstLetter, fetchUser, formatEmail } from "../../store/user";
import Avatar from "../Profile/Avatar";
import MenuButton from "../MenuButton";
import { fetchAllPins } from "../../store/pin";
import { fetchAllBoards } from "../../store/board";

const LoggedNav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const username = currentUser?.username;
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [displayName, setDisplayName] = useState('');
  const [displayInitial, setDisplayInitial] = useState('');

  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(fetchAllPins());
    dispatch(fetchAllBoards(currentUser?.id));
  }, [dispatch, username, currentUser?.avatar, currentUser?.id]);
  
  useEffect(() => {
    if (currentUser) {
      if (currentUser.firstName) {
        setDisplayName(capitalizeFirstLetter(currentUser.firstName));
      } else {
        setDisplayName(capitalizeFirstLetter(formatEmail(currentUser.email)));
      }
      setDisplayInitial(displayName[0]);
    }

    if (currentUser.avatar) {
      setAvatar(currentUser.avatar);
    }
  }, [displayName, currentUser, currentUser.avatar, currentUser.email, currentUser.firstName]);

  return (
    <div className="loggednav-container">
      <div className="loggednav-left">
        <Link to="/home">
          <div className="logged-logo-holder">
            <img className="logged-pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
          </div>
        </Link>
          <NavLink className="loggednav-btn" to='/home' >
            Home
          </NavLink>
        <NavLink className="loggednav-btn" to='/pin-builder' >
          Create
        </NavLink>
      </div>
      {/* <div className="search-bar">
        Search
      </div> */}
      <div className="loggednav-right">
        <div className="right-icon-holder">
          <div className="icon-holder">
            <a href="https://github.com/g-hor" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-square-github social-icon" />
            </a>
          </div>
        </div>
        <div className="right-icon-holder">
          <div className="icon-holder">
            <a href="https://www.linkedin.com/in/garyhor65/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin social-icon" />
            </a>
          </div>
        </div>
        <div className="right-initial-icon-holder">
          {currentUser?.avatar && (
            <NavLink 
              to={`/${currentUser?.username || displayName}`}
              className="initial-holder"
              >
              <Avatar avatar={avatar} />
            </NavLink>
            )}

          {!currentUser?.avatar && (
            <NavLink 
              to={`/${currentUser?.username || displayName}`}
              className="initial-holder"
              >
              {displayInitial}
            </NavLink>
            )}
        </div>
        <MenuButton displayInitial={displayInitial} displayName={displayName}/>
      </div>
    </div>
  )
};

export default LoggedNav;