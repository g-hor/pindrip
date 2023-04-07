import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { capitalizeFirstLetter, formatEmail } from "../../store/user";
import MenuButton from "../MenuButton";

const LoggedNav = () => {
  debugger
  const currentUser = useSelector(getCurrentUser);
  const [displayName, setDisplayName] = useState(formatEmail(currentUser?.email));
  const [displayInitial, setDisplayInitial] = useState(displayName[0]);
  
  useEffect(() => {
    if (currentUser?.firstName) {
      setDisplayName(prevName => capitalizeFirstLetter(currentUser?.firstName));
      setDisplayInitial(prevInitial => displayName[0]);
    } 
  }, [displayName, currentUser?.firstName]);


  return (
    <div className="loggednav-container">
      <div className="loggednav-left">
        <Link to="/">
          <div className="logged-logo-holder">
            <img className="logged-pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
          </div>
        </Link>
          <NavLink className="loggednav-btn" to='/' exact>
            Home
          </NavLink>
        <div className="loggednav-btn">
          Create
        </div>
      </div>
      <div className="search-bar">
        Search
      </div>
      <div className="loggednav-right">
        <div className="right-icon-holder">
          <div className="icon-holder">
            <Link to="https://github.com/g-hor">
              <i className="fa-brands fa-github social-icon"></i>
            </Link>
          </div>
        </div>
        <div className="right-icon-holder">
          <div className="icon-holder">
            <Link to="https://www.linkedin.com/in/garyhor65/">
              <i className="fa-brands fa-linkedin social-icon"></i>
            </Link>
          </div>
        </div>
        <div className="right-initial-icon-holder">
          <NavLink 
            to={`/${currentUser?.username || displayName}`}
            className="initial-holder"
            >
            {displayInitial}
          </NavLink>
        </div>
        <MenuButton displayInitial={displayInitial} displayName={displayName}/>
      </div>
    </div>
  )
};

export default LoggedNav;