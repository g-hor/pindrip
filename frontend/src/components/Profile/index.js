import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/user";
import { useEffect } from "react";
import UserInfo from "./UserInfo";
import PinIndex from "../Pins/PinIndex";
import './Profile.css';


const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams()

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [username, dispatch])


  return (
    <div id="profile-user-container">
      <UserInfo username={username} />
      <PinIndex />
    </div>
  );
};

export default Profile;
