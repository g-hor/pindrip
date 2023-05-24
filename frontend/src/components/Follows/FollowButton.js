import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../store/user';
import { receiveSession, storeCurrentUser } from '../../store/session';
import './Follow.css';


const FollowButton = ({ currentUser, showUser }) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(showUser?.followers?.includes(currentUser?.username));
  const [clickLimited, setClickLimited] = useState(false);
  
  const submitFollow = async () => {
    setClickLimited(true);
    if (!isFollowing && !clickLimited) {
      const res = await dispatch(followUser({ followerId: currentUser.id, followingId: showUser.id }));
      if (res?.ok) {
        currentUser.followedUsers.push(showUser.username);
        dispatch(receiveSession({ ...currentUser }));
        storeCurrentUser({ ...currentUser });
        setIsFollowing(true);
        setClickLimited(false);
      }
    }
  };

  const submitUnfollow = async () => {
    setClickLimited(true);
    if (isFollowing && !clickLimited) {
      const res = await dispatch(unfollowUser({ followerId: currentUser.id, followingId: showUser.id }));
      if (res?.ok) {
        const showUserIdx = currentUser.followedUsers.indexOf(showUser.username);
        currentUser.followedUsers.splice(showUserIdx, 1)
        dispatch(receiveSession({ ...currentUser }));
        storeCurrentUser({ ...currentUser });
        setIsFollowing(false);
        setClickLimited(false);
      }
    }
  };


  return (
    <div 
      className={isFollowing ? "follow-btn following" : "follow-btn"}
      onClick={isFollowing ? submitUnfollow : submitFollow}
      >
      {isFollowing ? "Following" : "Follow"}
    </div>
  )
};

export default FollowButton;