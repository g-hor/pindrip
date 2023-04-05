// import { useParams } from "react-router-dom";
import './Profile.css';
import { useSelector } from "react-redux";
// import UserInfo from "./UserInfo";


const Profile = () => {
  // const { username } = useParams()
  const currentUser = useSelector(state => state.session.user);
  console.log(currentUser);

  return (
    <div id="profile-container">
      <div>Profile</div>
    </div>
  );
};

export default Profile;
