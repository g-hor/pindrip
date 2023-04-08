import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { Link } from "react-router-dom";
import { getInitial } from "../../store/user";
import { useEffect, useState } from "react";
import SelectorBar from "./SelectorBar";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/user";
import { useParams } from "react-router-dom";

const UserInfo = ({ showUser }) => {
  const currentUser = useSelector(getCurrentUser);
  const [displayName, setDisplayName] = useState(showUser?.firstName);
  const [usernamePronouns, setUsernamePronouns] = useState();
  const [blurb, setBlurb] = useState(showUser?.about);
  const [urlAbout, setUrlAbout] = useState();
  const dispatch = useDispatch();
  const { username } = useParams()



  useEffect(() => {
    dispatch(fetchUser(username));
  }, [username, showUser, dispatch])


  useEffect(() => {
    
    if (showUser?.lastName) {
      setDisplayName(showUser?.firstName + ' ' + showUser?.lastName);
    } else {
      setDisplayName(showUser?.firstName);
    }
    
    if (showUser?.pronouns) {
      setUsernamePronouns('@' + showUser?.username + ' · ' + showUser?.pronouns);
    } else {
      setUsernamePronouns('@' + showUser?.username);
    }
    
    if (blurb?.length > 300) {
      setBlurb(prev => prev.slice(0, 300) + '...more')
    }

    if (showUser?.website && blurb) setUrlAbout(showUser?.website + ' · ' + blurb);
    
  }, [showUser, blurb])

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
          {urlAbout || showUser?.website || blurb}
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