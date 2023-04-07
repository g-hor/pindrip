import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../store/session";
import Sidebar from "./Sidebar";


const EditProfileForm = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <div id="edit-profile-main-container">
      <Sidebar />

      <div id="edit-form-container">

        <div>
          Public profile
        </div>

        <div>
          People visiting your profile will see the following info
        </div>

        <div>
          Photo
        </div>

        <div>
          
        </div>

      </div>

    </div>
  )
};

export default EditProfileForm;