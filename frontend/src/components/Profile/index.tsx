import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchUser } from '@store/user';
import { fetchAllBoards } from '@store/board';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import UserInfo from './UserInfo';
import PinIndexItem from '../Pins/PinIndexItem';
import SelectorBar from './SelectorBar';
import BoardIndex from './Board/BoardIndex';

import './Profile.css';

const Profile = () => {
	const dispatch = useAppDispatch();
	const { username } = useParams();
	const showUser = useAppSelector((state) => state?.users[username]);
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
					{createdPins?.map((pin, i) => (
						<div className="pin-index-item" key={i}>
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
