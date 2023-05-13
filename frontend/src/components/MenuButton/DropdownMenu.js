import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../store/session";
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

const DropdownMenu = ({ displayInitial, displayName }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [loggedName, setLoggedName] = useState(displayName)
  const [displayEmail, setDisplayEmail] = useState(currentUser.email);

  useEffect(() => {

    if (displayEmail.length > 23) {
      setDisplayEmail(prev => currentUser.email.slice(0, 23) + '...')
    };

    if (displayName.length > 20) {
      setLoggedName(displayName.slice(0, 20) + '...');
    }
  }, [currentUser.email, displayEmail.length, displayName, currentUser])

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };


  return (
    <div className="dropdown-content" >

      <div id="currently-logged">Currently logged in as:</div>

      <Link to={`/${currentUser.username}`}>
        <div id="profile-display-container">
          <div id="profile-display">
            <div id="profile-initial-holder">
              <div id="profile-initial">{displayInitial}</div>
            </div>
            <div id="profile-details-holder">
              <div id="profile-details-name">{loggedName}</div>
              <div id="profile-details-email">{displayEmail}</div>
            </div>
            <div id="check-mark">
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      </Link>
      <div id="profile-options">More options</div>
      <Link to="/editprofile">
        <div id="logout-button">
          Edit Profile
        </div>
      </Link>
      <div id="logout-button" onClick={clickLogout}>Log out</div>
    </div>
  );
};

export default DropdownMenu;