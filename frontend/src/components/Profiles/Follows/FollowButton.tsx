import { useEffect, useState } from 'react';

import { followUser, unfollowUser } from '@store/user';
import { receiveSession, storeCurrentUser } from '@store/session';
import { useAppDispatch } from '@store/hooks';

import './Follow.css';

const FollowButton = ({ currentUser, showUser }) => {
	const dispatch = useAppDispatch();

	const [isFollowing, setIsFollowing] = useState(showUser?.followers?.includes(currentUser?.id));
	const [clickLimited, setClickLimited] = useState(false);

	const submitFollow = async () => {
		setClickLimited(true);
		if (!isFollowing && !clickLimited) {
			const res = await dispatch(followUser({ followerId: currentUser.id, followingId: showUser.id }));
			if (res?.ok) {
				dispatch(receiveSession({ ...currentUser }));
				storeCurrentUser({ ...currentUser });
				setClickLimited(false);
			}
		}
	};

	const submitUnfollow = async () => {
		setClickLimited(true);
		if (isFollowing && !clickLimited) {
			const res = await dispatch(unfollowUser({ followerId: currentUser.id, followingId: showUser.id }));
			if (res?.ok) {
				dispatch(receiveSession({ ...currentUser }));
				storeCurrentUser({ ...currentUser });
				setIsFollowing(false);
				setClickLimited(false);
			}
		}
	};

	useEffect(() => {
		if (showUser?.followers?.includes(currentUser?.id)) {
			setIsFollowing(true);
		}
	}, [currentUser?.username, showUser?.followers]);

	return (
		<div
			className={isFollowing ? 'follow-btn following' : 'follow-btn'}
			onClick={isFollowing ? submitUnfollow : submitFollow}
		>
			{isFollowing ? 'Following' : 'Follow'}
		</div>
	);
};

export default FollowButton;
