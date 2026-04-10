import { AnyAction } from 'redux';
import type { IPin } from '../types';
import csrfFetch from './csrf';

// ACTION TYPES
const RECEIVE_PIN = 'pins/RECEIVE_PIN';
const RECEIVE_ALL_PINS = 'pins/RECEIVE_ALL_PINS';
const REMOVE_PIN = 'pins/REMOVE_PIN';

// ACTIONS
export const receivePin = (pin: IPin) => ({
	type: RECEIVE_PIN,
	payload: pin,
});

export const receiveAllPins = (pins: Record<number, IPin>) => ({
	type: RECEIVE_ALL_PINS,
	payload: pins,
});

export const removePin = (pinId: number) => ({
	type: REMOVE_PIN,
	payload: pinId,
});

// THUNK ACTION CREATORS
export const fetchPin = (pinId: number) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/pins/${pinId}`);
	let data = await res.json();
	dispatch(receivePin(data));
	return res;
};

export const fetchAllPins = () => async (dispatch: any) => {
	const res = await csrfFetch('/api/pins');
	let data = await res.json();
	dispatch(receiveAllPins(data));
	return res;
};

interface ICreatePinArgs {
	title: string;
	description: string;
	altText: string;
	website: string;
	photo: File;
}

export const createPin =
	({ title, description, altText, website, photo }: ICreatePinArgs) =>
	async (dispatch: any) => {
		const formData = new FormData();
		formData.append('pin[title]', title);
		formData.append('pin[description]', description);
		formData.append('pin[altText]', altText);
		formData.append('pin[website]', website);
		formData.append('pin[photo]', photo);
		const res = await csrfFetch('/api/pins', {
			method: 'POST',
			body: formData,
		});
		const data = await res.json();
		dispatch(receivePin(data));
		return data;
	};

export const deletePin = (pinId: number) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/pins/${pinId}`, {
		method: 'DELETE',
	});
	dispatch(removePin(pinId));
	return res;
};

export const updatePin = (pin: IPin) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/pins/${pin.id}`, {
		method: 'PATCH',
		body: JSON.stringify({ pin: pin }),
	});
	const data = await res.json();
	dispatch(receivePin(data));
	return res;
};

// REDUCER
const pinsReducer = (state: Record<number, IPin> = {}, action: AnyAction): Record<number, IPin> => {
	const nextState = { ...state };
	switch (action.type) {
		case RECEIVE_PIN:
			return { ...nextState, ...action.payload };
		case RECEIVE_ALL_PINS:
			return { ...nextState, ...action.payload };
		case REMOVE_PIN:
			delete nextState[action.payload];
			return { ...nextState };
		default:
			return state;
	}
};

export default pinsReducer;
