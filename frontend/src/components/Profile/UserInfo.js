import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { Link } from "react-router-dom";
import { getInitial } from "../../store/user";
import { useEffect } from "react";
import { fetchUser } from "../../store/user";
import SelectorBar from "./SelectorBar";

const UserInfo = ({ username }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const showUser = useSelector(state => state?.users[username])
  // const [displayName, setDisplayName] = useState(showUser?.firstName);
  // const [usernamePronouns, setUsernamePronouns] = useState(showUser?.pronouns);
  // const [blurb, setBlurb] = useState(showUser?.about);
  // const [urlAbout, setUrlAbout] = useState(showUser?.website);
  let displayName;
  let usernamePronouns;
  let about;
  let urlAbout;

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

  if (showUser?.website && about) urlAbout = (showUser?.website + ' · ' + about);

  // hahaha this doesn't work. michael helped me fix this uwu
  // useEffect(() => {
    // this used to contain all those messy if statements
  // }, [dispatch, showUser, username, displayName, usernamePronouns, urlAbout])

  // UserInfo will rerender a few times, sometimes without a predefined showUser
  if (!showUser) return null;

  return (
    <>
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
          {urlAbout || showUser?.website || about}
        </div>

        <div id="user-info-follow-container">
          <div id="user-info-follow">
            0 following
          </div>
        </div>

        {(currentUser.username === showUser.username) && 
          <div id="edit-profile-btn-container">
          <Link to='/editprofile'>
            <div id="edit-profile-btn">
              Edit Profile
            </div>
          </Link>
        </div>
        }

      </div>

      <SelectorBar />
    </>
  );
};

export default UserInfo;