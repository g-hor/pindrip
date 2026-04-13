import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IBoard, TThunkDispatch } from '../types';
import csrfFetch from './csrf';

// SLICE
const boardsSlice = createSlice({
	name: 'boards',
	initialState: {} as Record<number, IBoard>,
	reducers: {
		receiveBoard(state, action: PayloadAction<IBoard>) {
			state[action.payload.id] = action.payload;
		},
		receiveAllBoards(_state, action: PayloadAction<Record<string, IBoard>>) {
			const normalized: Record<number, IBoard> = {};
			Object.values(action.payload).forEach((board) => {
				normalized[board.id] = board;
			});
			return normalized;
		},
		removeBoard(state, action: PayloadAction<number>) {
			delete state[action.payload];
		},
	},
});

export const { receiveBoard, receiveAllBoards, removeBoard } = boardsSlice.actions;
export default boardsSlice.reducer;

// SELECTORS
export const getBoardByUrl =
	(boardUrl: string) =>
	(state: any): IBoard | undefined =>
		Object.values((state?.boards as Record<number, IBoard>) ?? {}).find((b) => b.boardUrl === boardUrl);

export const getSortedBoards = createSelector(
	(state: any) => state.boards as Record<number, IBoard>,
	(boards) => {
		const vals = Object.values(boards);
		return vals.slice(0, 1).concat(vals.slice(1).reverse());
	},
);

// THUNKS
export const fetchBoard =
	(boardId: number) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/boards/${boardId}`);
		const data = await res.json();
		dispatch(receiveBoard(data));
		return res;
	};

export const fetchAllBoards =
	(userId: number) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
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

export const updateBoard =
	(board: Partial<IBoard> & { id: number }) =>
	async (dispatch: TThunkDispatch): Promise<IBoard> => {
		const res = await csrfFetch(`/api/boards/${board.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ board: { ...board } }),
		});
		const data: IBoard = await res.json();
		dispatch(receiveBoard(data));
		return data;
	};

export const deleteBoard =
	(boardId: number) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/boards/${boardId}`, { method: 'DELETE' });
		dispatch(removeBoard(boardId));
		return res;
	};
