import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { capitalizeFirstLetter, fetchUser, formatEmail } from "../../store/user";
import Avatar from "../Profile/Avatar";
import MenuButton from "../MenuButton";
import { fetchAllPins } from "../../store/pin";

const LoggedNav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const username = currentUser?.username;
  const [displayName, setDisplayName] = useState('');
  const [displayInitial, setDisplayInitial] = useState('');

  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(fetchAllPins());
  }, [dispatch, username, currentUser.avatar]);
  
  useEffect(() => {
    if (currentUser) {
      setDisplayName(capitalizeFirstLetter(formatEmail(currentUser?.email)));
      setDisplayInitial(displayName[0]);
    } 
  }, [displayName, currentUser, currentUser.avatar]);


  return (
    <div className="loggednav-container">
      <div className="loggednav-left">
        <Link to="/">
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
      <div className="search-bar">
        Search
      </div>
      <div className="loggednav-right">
        <div className="right-icon-holder">
          <div className="icon-holder">
            <a href="https://github.com/g-hor">
              <i className="fa-brands fa-github social-icon"></i>
            </a>
          </div>
        </div>
        <div className="right-icon-holder">
          <div className="icon-holder">
            <a href="https://www.linkedin.com/in/garyhor65/">
              <i className="fa-brands fa-linkedin social-icon"></i>
            </a>
          </div>
        </div>
        <div className="right-initial-icon-holder">
          {currentUser.avatar && (
            <NavLink 
              to={`/${currentUser?.username || displayName}`}
              className="initial-holder"
              >
              <Avatar avatar={currentUser.avatar} />
            </NavLink>
            )}

          {!currentUser.avatar && (
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