import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IBoard, TThunkDispatch } from '../types';
import csrfFetch from './csrf';


// SLICE
const boardsSlice = createSlice({
	name: 'boards',
	initialState: {} as Record<string, IBoard>,
	reducers: {
		receiveBoard(state, action: PayloadAction<IBoard>) {
			state[action.payload.name] = action.payload;
		},
		receiveAllBoards(_state, action: PayloadAction<Record<string, IBoard>>) {
			return action.payload;
		},
		removeBoard(state, action: PayloadAction<number>) {
			const key = Object.keys(state).find((k) => state[k].id === action.payload);
			if (key) delete state[key];
		},
	},
});

export const { receiveBoard, receiveAllBoards, removeBoard } = boardsSlice.actions;
export default boardsSlice.reducer;


// THUNKS
export const fetchBoard = (boardId: number) => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch(`/api/boards/${boardId}`);
	const data = await res.json();
	dispatch(receiveBoard(data));
	return res;
};

export const fetchAllBoards = (userId: number) => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch(`/api/users/${userId}/boards`);
	const data = await res.json();
	dispatch(receiveAllBoards(data));
	return res;
};

export const createBoard =
	(board: Partial<IBoard>) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch('/api/boards', {
			method: 'POST',
			body: JSON.stringify({ board: { ...board } }),
		});
		const data = await res.json();
		dispatch(receiveBoard(data));
		return res;
	};

export const updateBoard = (board: IBoard) => async (dispatch: TThunkDispatch): Promise<IBoard> => {
	const res = await csrfFetch(`/api/boards/${board.id}`, {
		method: 'PATCH',
		body: JSON.stringify({ board: { ...board } }),
	});
	const data: IBoard = await res.json();
	dispatch(receiveBoard(data));
	return data;
};

export const deleteBoard = (boardId: number) => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch(`/api/boards/${boardId}`, { method: 'DELETE' });
	dispatch(removeBoard(boardId));
	return res;
};
