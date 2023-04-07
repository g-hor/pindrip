import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/user';
import { useEffect } from "react";
import UserInfo from "./UserInfo";
import './Profile.css';


const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const showUser = useSelector(state => state.users[username])


  useEffect(() => {
    dispatch(userActions.fetchUser(username));
  }, [username, dispatch])

  return (
    <div id="profile-user-container">
      <UserInfo showUser={showUser} />
    </div>
  );
};

export default Profile;
