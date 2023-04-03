import { Link } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";

const UnauthNav = () => {

  return (
    <div className="unauth-container">
        <Link to="/">
          <div className="unauth-logo-container">
              <img className="pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
            <div className="title-container">
              <h1>Pindrip</h1>
            </div>
          </div>
        </Link>

      <div className="unauth-links-container">
        <div className="unauth-links">
          <div className="link">
            <a href="https://github.com/g-hor">
            GitHub
            </a>
          </div>
          <div className="link">
            <a href="https://www.linkedin.com/in/garyhor65/">
              LinkedIn
            </a>
          </div>
        </div>
          <div className="btn-container">
            <LoginFormModal />
          </div>
          <div className="btn-container">
            <button className="signup-btn">
              Sign up
            </button>
          </div>
      </div>
    </div>
  )
};

export default UnauthNav;