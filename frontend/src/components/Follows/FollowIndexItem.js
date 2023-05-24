import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInitial } from "../../store/user";
import { getCurrentUser } from "../../store/session";
import Avatar from "../Profile/Avatar";
import FollowButton from "./FollowButton";


const FollowIndexItem = ({ username, onClose }) => {
  const currentUser = useSelector(getCurrentUser);
  const showUser = useSelector(state => state?.users[username]);
  const avatar = showUser?.avatar;

  return (
    <div className="follow-index-item">
      <div className="follow-index-item-user">
        <Link to={`/${username}`} onClick={onClose}>
          {avatar ? 
            <Avatar avatar={avatar} /> : 
            <div className="follow-index-initial-holder">
              <div className="follow-index-initial">
                {getInitial(showUser)}
              </div>
            </div>
            }
        </Link>
        
        <Link to={`/${username}`} onClick={onClose}>{username}</Link>
      </div>

      <FollowButton currentUser={currentUser} showUser={showUser} />
    </div>
  )
};

export default FollowIndexItem;