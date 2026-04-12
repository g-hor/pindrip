import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchUser, getUserByUsername } from '@store/user';
import { fetchAllBoards } from '@store/board';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import UserInfo from './UserInfo/UserInfo';
import PinIndexItem from '../Pins/Index/PinIndexItem';
import SelectorBar from './SelectorBar/SelectorBar';
import BoardIndex from './Boards/BoardIndex';

import './Profile.css';

const Profile = () => {
	const dispatch = useAppDispatch();
	const { username } = useParams();
	const showUser = useAppSelector(getUserByUsername(username));
	const pins = useAppSelector((state) => state?.pins);
	const createdPins = showUser?.createdPins.map((pinId) => pins[pinId]);
	const [showCreated, setShowCreated] = useState(false);
	const [showSaved, setShowSaved] = useState(true);

	useEffect(() => {
		dispatch(fetchUser(username));
		dispatch(fetchAllBoards(showUser?.id));
	}, [username, dispatch, showUser?.id]);

	return (
		<div id="profile-user-container">
			<UserInfo username={username} />

			<SelectorBar setShowCreated={setShowCreated} setShowSaved={setShowSaved} />

			{showCreated && (
				<div id="pins-index-container">
					{createdPins?.map((pin) => (
						<div className="pin-index-item" key={pin.id}>
							<PinIndexItem pin={pin} />
						</div>
					))}
				</div>
			)}

			{showSaved && (
				<div id="boards-index-container">
					<BoardIndex showUser={showUser} />
				</div>
			)}

			<div id="pins-index-bar" />
		</div>
	);
};

export default Profile;
