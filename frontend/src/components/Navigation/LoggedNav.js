import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";

const LoggedNav = () => {
  const currentUser = useSelector(state => state.session.user);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatEmail = (emailAddress) => {
    const email = emailAddress.split("@")[0];
    return capitalizeFirstLetter(email);
  };

  const [displayName, setDisplayName] = useState(formatEmail(currentUser.email));
  const [displayInitial, setDisplayInitial] = useState(displayName[0]);

  useEffect(() => {
    if (currentUser.firstName) {
      setDisplayName(prevName => capitalizeFirstLetter(currentUser.firstName));
      setDisplayInitial(prevInitial => displayName[0]);
    } 
  }, [displayName, currentUser.firstName]);


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
          <NavLink 
            to={`/${currentUser.username || displayName}`}
            className="initial-holder"
            >
            {displayInitial}
          </NavLink>
        </div>
        <ProfileButton displayInitial={displayInitial} displayName={displayName}/>
      </div>
    </div>
  )
};

export default LoggedNav;