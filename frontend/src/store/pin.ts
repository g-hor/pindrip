import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IPin, ICreatePinArgs, TThunkDispatch } from '../types';
import csrfFetch from './csrf';

// SLICE
const pinsSlice = createSlice({
	name: 'pins',
	initialState: {} as Record<number, IPin>,
	reducers: {
		receivePin(state, action: PayloadAction<IPin>) {
			state[action.payload.id] = action.payload;
		},
		receiveAllPins(_state, action: PayloadAction<Record<number, IPin>>) {
			return action.payload;
		},
		removePin(state, action: PayloadAction<number>) {
			delete state[action.payload];
		},
	},
});

export const { receivePin, receiveAllPins, removePin } = pinsSlice.actions;
export default pinsSlice.reducer;

// THUNKS
export const fetchPin =
	(pinId: number) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/pins/${pinId}`);
		const data = await res.json();
		dispatch(receivePin(data));
		return res;
	};

export const fetchAllPins =
	() =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch('/api/pins');
		const data = await res.json();
		dispatch(receiveAllPins(data));
		return res;
	};

export const createPin =
	({ title, description, altText, website, photo }: ICreatePinArgs) =>
	async (dispatch: TThunkDispatch): Promise<IPin> => {
		const formData = new FormData();
		formData.append('pin[title]', title);
		formData.append('pin[description]', description);
		formData.append('pin[altText]', altText);
		formData.append('pin[website]', website);
		formData.append('pin[photo]', photo);
		const res = await csrfFetch('/api/pins', { method: 'POST', body: formData });
		const data: IPin = await res.json();
		dispatch(receivePin(data));
		return data;
	};

export const deletePin =
	(pinId: number) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/pins/${pinId}`, { method: 'DELETE' });
		dispatch(removePin(pinId));
		return res;
	};

export const updatePin =
	(pin: IPin) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/pins/${pin.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ pin }),
		});
		const data: IPin = await res.json();
		dispatch(receivePin(data));
		return res;
	};
