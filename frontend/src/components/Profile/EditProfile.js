import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";


const EditProfile = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <div id="edit-profile-main-container">
      edit {currentUser.username}'s profile
    </div>
  );
};

export default EditProfile;