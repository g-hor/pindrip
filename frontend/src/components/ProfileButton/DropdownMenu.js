import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

const DropdownMenu = ({ displayInitial, displayName }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };


  return (
    <div className="dropdown-content" >
      <div id="currently-logged">Currently logged in as:</div>
      <div id="profile-display-container">
        <div id="profile-display">
          <div id="profile-initial-holder">
            <div id="profile-initial">{displayInitial}</div>
            </div>
          <div id="profile-details-holder">
            <div id="profile-details-name">{displayName}</div>
            <div id="profile-details-email">{currentUser.email}</div>
          </div>
          <div id="check-mark">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
      </div>
      <div id="profile-options">More options</div>
      <div id="logout-button" onClick={clickLogout}>Log out</div>
    </div>
  );
};

export default DropdownMenu;