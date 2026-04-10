import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getCurrentUser } from '@store/session';
import { fetchAllBoards } from '@store/board';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import PinIndexItem from './PinIndexItem';

import './PinIndex.css';

const PinIndex = () => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(getCurrentUser);
	const pins = useAppSelector((state) => Object.values(state.pins).reverse());

	const { username } = useParams();

	useEffect(() => {
		dispatch(fetchAllBoards(currentUser?.id));
	}, [dispatch, currentUser?.id, username]);

	return (
		<>
			<div id="pins-index-page">
				<div id="pins-index-container">
					{pins.map((pin, i) => (
						<div className={!username ? 'pin-index-item home-pin' : 'pin-index-item'} key={i}>
							<PinIndexItem pin={pin} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default PinIndex;
