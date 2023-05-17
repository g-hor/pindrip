import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { Link } from "react-router-dom";
import { getInitial } from "../../store/user";
import { useEffect } from "react";
import { fetchUser } from "../../store/user";
import Avatar from "./Avatar";

const UserInfo = ({ username }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const showUser = useSelector(state => state?.users[username])
  let displayName;
  let usernamePronouns;
  let about;
  

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch, username])

  if (showUser?.lastName) {
    displayName = showUser?.firstName + ' ' + showUser?.lastName;
  } else {
    displayName = showUser?.firstName;
  }
  
  if (showUser?.pronouns) {
    usernamePronouns = '@' + showUser?.username + ' · ' + showUser?.pronouns;
  } else {
    usernamePronouns = '@' + showUser?.username;
  }
  
  if (showUser?.about?.length > 300) {
    about = showUser?.about.slice(0, 300) + '...more';
  } else {
    about = showUser?.about;
  }

  // hahaha this doesn't work. michael helped me fix this uwu
  // useEffect(() => {
    // this used to contain all those messy if statements
  // }, [dispatch, showUser, username, displayName, usernamePronouns, urlAbout])

  // UserInfo will rerender a few times, sometimes without a predefined showUser

  if (!showUser) return null;

  return (
    <div id="user-info-container">
      {showUser?.avatar && (
        <div id="user-info-initial-holder">
          <div id="user-info-intial">
            <Avatar avatar={showUser?.avatar} />
          </div>
        </div>)}

      {!showUser.avatar && (
        <div id="user-info-initial-holder">
          <div id="user-info-initial">
            {getInitial(showUser)}
          </div>
        </div>)}

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
        {showUser?.website && about && (
          <>
            <a 
              href="https://github.com/g-hor/pindrip"
              target="_blank"
              rel="noreferrer"
              >
              {showUser?.website}
            </a>
            {' · ' + about}
          </>
        )}
        {(showUser?.website && !about) && (
          <a 
            href="https://github.com/g-hor/pindrip"
            target="_blank"
            rel="noreferrer"
            >
            {showUser?.website}
          </a>
          )}
        {(!showUser?.website && about) && (
          about
        )}
      </div>

      <div id="user-info-follow-container">
        <div id="user-info-follow">
          0 following
        </div>
      </div>

      {(currentUser?.username === showUser?.username) && 
        <div id="edit-profile-btn-container">
        <Link to='/editprofile'>
          <div id="edit-profile-btn">
            Edit Profile
          </div>
        </Link>
      </div>
      }

    </div>
  );
};

export default UserInfo;