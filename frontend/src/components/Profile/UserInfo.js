import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { getInitial } from "../../store/user";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const currentUser = useSelector(getCurrentUser);
  // CHANGE LOGIC FROM CURRENT USER TO SHOWINGUSER
  // displayName is set to default of empty string to prevent stutter rerender of name
  const [displayName, setDisplayName] = useState('');

  
  useEffect(() => {

    if (currentUser.lastName) {
      setDisplayName(prev => currentUser.firstName + ' ' + currentUser.lastName)
    } else {
      setDisplayName(prev => currentUser.firstName)
    }

  }, [currentUser.lastName])
  
  return (
    <div id="user-info-container">

      <div id="user-info-initial-holder">
        <div id="user-info-initial">
          {getInitial(currentUser)}
        </div>
      </div>

      <div id="user-info-name-container">
        <div id="user-info-name">
          {displayName}
        </div>
      </div>

      <div id="user-info-username-container">
        <div id="user-info-username">
          {"@" + currentUser.username}
        </div>
      </div>

      <div id="user-info-follow-container">
        <div id="user-info-follow">
          0 following
        </div>
      </div>

      <div id="edit-profile-btn-container">
        <div id="edit-profile-btn">
          Edit Profile
        </div>
      </div>

    </div>
  );
};

export default UserInfo;