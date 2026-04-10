import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getCurrentUser } from '@store/session';
import { getInitial, fetchUser, getUserByUsername } from '@store/user';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import Avatar from './Avatar';
import FollowButton from '../Follows/FollowButton';
import FollowIndex from '../Follows/FollowIndex';

const UserInfo = ({ username }) => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(getCurrentUser);
	const showUser = useAppSelector(getUserByUsername(username));

	const [showFollowers, setShowFollowers] = useState(false);
	const [showFollowings, setShowFollowings] = useState(false);

	const { followingCount, followerCount, followers, followedUsers } = showUser;

	let displayName: string;
	let usernamePronouns: string;
	let about: string;

	useEffect(() => {
		dispatch(fetchUser(username));
	}, [dispatch, username]);

	if (showUser?.lastName) {
		displayName = showUser?.firstName + ' ' + showUser?.lastName;
	} else {
		displayName = showUser?.firstName;
	}

	if (showUser?.pronouns) {
		usernamePronouns = '@' + showUser?.username + ' · ' + showUser?.pronouns;
	} else {
		usernamePronouns = '@' + showUser?.username;
	}

	if (showUser?.about?.length > 300) {
		about = showUser?.about.slice(0, 300) + '...more';
	} else {
		about = showUser?.about;
	}

	// UserInfo will rerender a few times, sometimes without a predefined showUser
	if (!showUser) return null;

	return (
		<div id="user-info-container">
			{showUser?.avatar && (
				<div id="user-info-initial-holder">
					<div id="user-info-intial">
						<Avatar avatar={showUser?.avatar} />
					</div>
				</div>
			)}

			{!showUser.avatar && (
				<div id="user-info-initial-holder">
					<div id="user-info-initial">{getInitial(showUser)}</div>
				</div>
			)}

			<div id="user-info-name-container">
				<div id="user-info-name">{displayName}</div>
			</div>

			<div id="user-info-username-container">
				<div id="user-info-username">{usernamePronouns}</div>
			</div>

			<div id="user-info-urlabout-container">
				{showUser?.website && about && (
					<>
						<a href="https://github.com/g-hor/pindrip" target="_blank" rel="noreferrer">
							{showUser?.website}
						</a>
						{' · ' + about}
					</>
				)}
				{showUser?.website && !about && (
					<a href="https://github.com/g-hor/pindrip" target="_blank" rel="noreferrer">
						{showUser?.website}
					</a>
				)}
				{!showUser?.website && about && about}
			</div>

			<div id="user-info-follow-container">
				<span
					id="user-info-follow"
					className={followerCount > 0 ? 'bold-follow' : ''}
					onClick={() => followerCount > 0 && setShowFollowers(true)}
				>
					{followerCount} followers
				</span>
				<span>{' · '}</span>
				<span
					id="user-info-follow"
					className={followingCount > 0 ? 'bold-follow' : ''}
					onClick={() => followingCount > 0 && setShowFollowings(true)}
				>
					{followingCount} following
				</span>
			</div>

			{currentUser?.username === showUser?.username ? (
				<div id="edit-profile-btn-container">
					<Link to="/editprofile">
						<div id="edit-profile-btn">Edit Profile</div>
					</Link>
				</div>
			) : (
				<FollowButton currentUser={currentUser} showUser={showUser} />
			)}

			{showFollowers && (
				<FollowIndex
					displayUserIds={followers}
					count={followerCount}
					title={'Followers'}
					onClose={() => setShowFollowers(false)}
				/>
			)}
			{showFollowings && (
				<FollowIndex
					displayUserIds={followedUsers}
					count={followingCount}
					title={'Following'}
					onClose={() => setShowFollowings(false)}
				/>
			)}
		</div>
	);
};

export default UserInfo;
