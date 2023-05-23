
import { useDispatch } from 'react-redux';
import { followUser } from '../../store/user';
import './FollowButton.css';

const FollowButton = ({ currentUser, showUser }) => {
  const dispatch = useDispatch();
  let isFollowing;
  
  const submitFollow = async () => {
    const res = await dispatch(followUser({ followerId: currentUser.id, followingId: showUser.id }));
    if (res?.ok) {
      isFollowing = true;
    }
  };

  const submitUnfollow = () => {

  };

  if (currentUser?.followedUsers.includes(showUser?.id)) {
    isFollowing = true;
  };

  return (
    <div 
      className="follow-btn"
      onClick={isFollowing ? submitUnfollow : submitFollow}
      >
      {isFollowing ? "Following" : "Follow"}
    </div>
  )
};

export default FollowButton;