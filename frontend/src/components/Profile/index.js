import { useParams } from "react-router-dom";
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/user';
import { useEffect } from "react";
import UserInfo from "./UserInfo";
import SelectorBar from "./SelectorBar";


const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const showUser = useSelector(state => state.users[username])

  useEffect(() => {
    debugger
    dispatch(userActions.fetchUser(username));
  }, [username])

  return (
    <div id="profile-user-container">
      <UserInfo showUser={showUser} />
      <SelectorBar />
      <a href="/demo">demo</a>
    </div>
  );
};

export default Profile;
