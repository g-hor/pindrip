import { AnyAction } from 'redux';
import type { IBoard } from '../types';
import csrfFetch from './csrf';

// ACTION TYPES
const RECEIVE_BOARD = 'boards/RECEIVE_BOARD';
const RECEIVE_ALL_BOARDS = 'boards/RECEIVE_ALL_BOARDS';
const REMOVE_BOARD = 'boards/REMOVE_BOARD';

// ACTIONS
export const receiveBoard = (board: IBoard) => ({
	type: RECEIVE_BOARD,
	payload: board,
});

export const receiveAllBoards = (boards: Record<string, IBoard>) => ({
	type: RECEIVE_ALL_BOARDS,
	payload: boards,
});

export const removeBoard = (boardId: number) => ({
	type: REMOVE_BOARD,
	payload: boardId,
});

// THUNK ACTION CREATORS
export const fetchBoard = (boardId: number) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/boards/${boardId}`);
	let data = await res.json();
	dispatch(receiveBoard(data));
	return res;
};

export const fetchAllBoards = (userId: number) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/users/${userId}/boards`);
	const data = await res.json();
	dispatch(receiveAllBoards(data));
	return res;
};

export const createBoard = (board: Partial<IBoard>) => async (dispatch: any) => {
	const res = await csrfFetch('/api/boards', {
		method: 'POST',
		body: JSON.stringify({ board: { ...board } }),
	});
	const data = await res.json();
	dispatch(receiveBoard(data));
	return res;
};

export const updateBoard = (board: IBoard) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/boards/${board.id}`, {
		method: 'PATCH',
		body: JSON.stringify({ board: { ...board } }),
	});
	const data = await res.json();
	dispatch(receiveBoard(data));
	return data;
};

export const deleteBoard = (boardId: number) => async (dispatch: any) => {
	const res = await csrfFetch(`/api/boards/${boardId}`, {
		method: 'DELETE',
	});
	dispatch(removeBoard(boardId));
	return res;
};

// REDUCER
const boardsReducer = (state: Record<string, IBoard> = {}, action: AnyAction): Record<string, IBoard> => {
	const nextState = { ...state };
	switch (action.type) {
		case RECEIVE_BOARD:
			return { ...nextState, ...action.payload };
		case RECEIVE_ALL_BOARDS:
			return { ...action.payload };
		case REMOVE_BOARD:
			delete nextState[action.payload];
			return { ...nextState };
		default:
			return state;
	}
};

export default boardsReducer;
