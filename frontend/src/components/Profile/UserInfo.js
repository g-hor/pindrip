import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { getInitial } from "../../store/user";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const currentUser = useSelector(getCurrentUser);
  // CHANGE LOGIC FROM CURRENT USER TO SHOWINGUSER
  const [displayName, setDisplayName] = useState(currentUser.firstName);
  const [usernamePronouns, setUsernamePronouns] = useState(currentUser.username);
  const [url, setUrl] = useState(currentUser.website);
  const [blurb, setBlurb] = useState(currentUser.about);
  const [urlAbout, setUrlAbout] = useState(null);
  
  useEffect(() => {

    if (currentUser.lastName) {
      setDisplayName(currentUser.firstName + ' ' + currentUser.lastName);
    } else {
      setDisplayName(currentUser.firstName);
    }

    if (currentUser.pronouns) {
      setUsernamePronouns('@' + currentUser.username + ' · ' + currentUser.pronouns);
    }

    if (url && blurb) {
      setUrlAbout(url + ' · ' + blurb);
    } else {
      setUrlAbout(url || blurb);
    }

    if (urlAbout?.length > 300) {
      setUrlAbout(prev => prev.slice(0, 300) + '...more')
    }
    
  }, [currentUser])

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
          {usernamePronouns}
        </div>
      </div>

      <div id="user-info-urlabout-container">
        {urlAbout}
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