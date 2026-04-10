import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';

import { getCurrentUser } from '@store/session';
import { fetchAllBoards } from '@store/board';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { TRootState } from '@store/index';

import PinIndexItem from './PinIndexItem';

import './PinIndex.css';

const selectReversedPins = createSelector(
	(state: TRootState) => state.pins,
	(pins) => Object.values(pins).reverse(),
);

const PinIndex = () => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(getCurrentUser);
	const pins = useAppSelector(selectReversedPins);

	const { username } = useParams();

	useEffect(() => {
		dispatch(fetchAllBoards(currentUser?.id));
	}, [dispatch, currentUser?.id, username]);

	console.log({ pins });

	return (
		<>
			<div id="pins-index-page">
				<div id="pins-index-container">
					{pins.map((pin) => (
						<div className={!username ? 'pin-index-item home-pin' : 'pin-index-item'} key={pin.id}>
							<PinIndexItem pin={pin} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default PinIndex;
