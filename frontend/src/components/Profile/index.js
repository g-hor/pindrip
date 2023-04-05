import { useParams } from "react-router-dom";
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/user';
import { useEffect } from "react";
// import UserInfo from "./UserInfo";


const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const currentUser = useSelector(state => state.session.user);
  console.log(currentUser);
  const user = useSelector(state => state.users[1]);

  useEffect(() => {
    dispatch(userActions.fetchUser(1));
  }, [])

  return (
    <div id="profile-container">
      {/* <div>ayeeeee wassup welcome to {user.username}'s profile page</div> */}
    </div>
  );
};

export default Profile;
