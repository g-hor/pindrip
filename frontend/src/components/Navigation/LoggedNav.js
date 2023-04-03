import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

const LoggedNav = () => {
  const dispatch = useDispatch();

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  }

  return (
    <div className="loggednav-container">
      <div className="loggednav-left">
        <Link to="/">
          <div className="logged-logo-container">
            <img className="logged-pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
          </div>
        </Link>
        <div className="loggednav-btn">
          <NavLink to='/'>Home</NavLink>
        </div>
        <div className="loggednav-btn">
          Create
        </div>
      </div>
      <div className="search-bar">
        Search
      </div>
      <div className="loggednav-right">
        <div className="icon-holder">
          <a href="https://github.com/g-hor">
            <i className="fa-brands fa-github fa-2x social-icon"></i>
          </a>
        </div>
        <div className="icon-holder">
          <a href="https://www.linkedin.com/in/garyhor65/">
            <i className="fa-brands fa-linkedin fa-2x social-icon"></i>
          </a>
        </div>
        <div>user avatar</div>
        <div className="dropdown">
          <i className="fa-solid fa-chevron-down"></i>
          <div className="dropdown-content" onClick={clickLogout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoggedNav;