import { NavLink } from "react-router-dom";
import './EditProfile.css';
import { useState } from "react";
import EditAccountForm from "./EditAccountForm";
import EditPersonalForm from "./EditPersonalForm";
import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
  const [showPublic, setShowPublic] = useState(true);
  const [showPersonal, setShowPersonal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  return (
    <div id="edit-profile-main-container">
      
      <div id="edit-profile-sidebar-container">
        <ul id="edit-profile-list">
          <div className="edit-profile-sidebar-link-container">
            <NavLink to="/editprofile">
              <li className="edit-profile-sidebar-options">
                Public profile
                <div id="edit-underline" />
              </li>
            </NavLink>
          </div>
          <div className="edit-profile-sidebar-link-container">
            <NavLink to="/editpersonal">
              <li className="edit-profile-sidebar-options">
                Personal information
                <div id="edit-underline" />
              </li>
            </NavLink>
          </div>
          <div className="edit-profile-sidebar-link-container">
            <NavLink to="/editaccount">
              <li className="edit-profile-sidebar-options">
                Account management
                <div id="edit-underline" />
              </li>
            </NavLink>
          </div>
        </ul>
      </div>

      {showPublic && <EditProfileForm />}
      {showPersonal && <EditPersonalForm />}
      {showAccount && <EditAccountForm />}

    </div>
  );
};

export default EditProfile;