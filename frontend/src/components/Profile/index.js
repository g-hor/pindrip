import { useParams } from "react-router-dom";
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/user';
import { useEffect } from "react";
import { getCurrentUser } from "../../store/session";
import UserInfo from "./UserInfo";
import SelectorBar from "./SelectorBar";


const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const currentUser = useSelector(getCurrentUser);
  const user = useSelector(state => state.users[1]);

  useEffect(() => {
    dispatch(userActions.fetchUser(1));
  }, [])

  return (
    <div id="profile-user-container">
      <UserInfo />
      <SelectorBar />
    </div>
  );
};

export default Profile;
