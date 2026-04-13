import { NavLink } from "react-router-dom";
import './EditProfile.css';

const Sidebar = () => {

  return (
    <div id="edit-profile-sidebar-container">
      <ul id="edit-profile-list">
        <div className="edit-profile-sidebar-link-container">
          <NavLink to="/editprofile" >
            <li className="edit-profile-sidebar-options">
              Public profile
              <div id="edit-underline" />
            </li>
          </NavLink>
        </div>
        <div className="edit-profile-sidebar-link-container">
          <NavLink to="/editpersonal" >
            <li className="edit-profile-sidebar-options">
              <div>Personal information</div>
              <div id="edit-underline" />
            </li>
          </NavLink>
        </div>
        <div className="edit-profile-sidebar-link-container">
          <NavLink to="/editaccount" >
            <li className="edit-profile-sidebar-options">
              Account management
              <div id="edit-underline" />
            </li>
          </NavLink>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;