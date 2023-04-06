import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { getInitial } from "../../store/user";
import { useEffect, useState } from "react";

const UserInfo = ({ showUser }) => {
  const [displayName, setDisplayName] = useState(showUser?.firstName);
  const [usernamePronouns, setUsernamePronouns] = useState('@' + showUser?.username);
  const [blurb, setBlurb] = useState(showUser?.about);
  const [urlAbout, setUrlAbout] = useState(null);
  debugger
  
  useEffect(() => {
    
    if (showUser?.lastName) {
      setDisplayName(showUser?.firstName + ' ' + showUser?.lastName);
    } else {
      setDisplayName(showUser?.firstName);
    }
    
    if (showUser?.pronouns) {
      setUsernamePronouns(showUser?.username + ' · ' + showUser?.pronouns);
    }
    
    if (blurb?.length > 300) {
      setBlurb(prev => prev.slice(0, 300) + '...more')
    }

    if (showUser?.website && blurb) setUrlAbout(showUser?.website + ' · ' + blurb);
    
  }, [showUser])
  
  if (!showUser) return null;
  
  return (
    <div id="user-info-container">

      <div id="user-info-initial-holder">
        <div id="user-info-initial">
          {getInitial(showUser)}
        </div>
      </div>

      <div id="user-info-name-container">
        <div id="user-info-name">
          {displayName}
        </div>
      </div>

      <div id="user-info-username-container">
        <div id="user-info-username">
          {usernamePronouns}
        </div>
      </div>

      <div id="user-info-urlabout-container">
        {urlAbout || showUser?.website || blurb}
      </div>

      <div id="user-info-follow-container">
        <div id="user-info-follow">
          0 following
        </div>
      </div>

      <div id="edit-profile-btn-container">
        <a href='/editprofile'>
          <div id="edit-profile-btn">
            Edit Profile
          </div>
        </a>
      </div>

    </div>
  );
};

export default UserInfo;