import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../store/user";
import UserInfo from "./UserInfo";
import PinIndexItem from "../Pins/PinIndexItem";
import SelectorBar from "./SelectorBar";
import './Profile.css';


const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const showUser = useSelector(state => state.users[username]);
  const pins = useSelector(state => state.pins);
  const createdPins = showUser?.createdPins.map(pinId => pins[pinId]);
  const [showCreated, setShowCreated] = useState(true);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [username, dispatch])


  return (
    <div id="profile-user-container">
      <UserInfo username={username} />

      <SelectorBar 
        setShowCreated={setShowCreated}
        setShowSaved={setShowSaved}
        />

      {showCreated && (
        <div id="pins-index-container">
          {createdPins?.map((pin, i) => 
            <div className="pin-index-item" key={i}>
              <PinIndexItem pin={pin} />
            </div>
            )}
        </div>
        )}
      
      {showSaved && (
        <div>
        </div>
        )}

      <div id="pins-index-bar" />
    </div>
  );
};

export default Profile;
