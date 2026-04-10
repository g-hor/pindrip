import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IUpdatePasswordArgs, IDeleteUserArgs, IFollowArgs, TThunkDispatch } from '../types';
import csrfFetch from './csrf';
import { logoutUser, storeCurrentUser } from './session';


// FORMATTING HELPERS
export const getInitial = (user: IUser): string => {
	if (user.username) return user.username[0].toUpperCase();
	return formatEmail(user.email)[0];
};

export const capitalizeFirstLetter = (string: string): string => {
	return string[0].toUpperCase() + string.slice(1);
};

export const formatEmail = (emailAddress: string): string => {
	return capitalizeFirstLetter(emailAddress.split('@')[0]);
};


// SLICE
const usersSlice = createSlice({
	name: 'users',
	initialState: {} as Record<string, IUser>,
	reducers: {
		receiveAllUsers(_state, action: PayloadAction<Record<string, IUser>>) {
			return action.payload;
		},
		receiveUser(state, action: PayloadAction<IUser>) {
			if (action.payload.username) {
				state[action.payload.username] = action.payload;
			}
		},
		removeUser(state, action: PayloadAction<string>) {
			delete state[action.payload];
		},
	},
});

export const { receiveAllUsers, receiveUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;


// THUNKS
export const fetchAllUsers = () => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch('/api/users');
	const data = await res.json();
	dispatch(receiveAllUsers(data));
	return res;
};

export const fetchUser = (username: string) => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch(`/api/users/${username}`);
	const data = await res.json();
	dispatch(receiveUser(data));
	return res;
};

export const updateUser =
	(user: Partial<IUser> & { id: number }) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/users/${user.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ user: { ...user } }),
		});
		const data = await res.json();
		storeCurrentUser(data);
		dispatch(receiveUser(data));
		return res;
	};

export const updatePassword =
	({ id, email, oldPw, newPw }: IUpdatePasswordArgs) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/users/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ user: { email, oldPw, newPw } }),
		});
		const data = await res.json();
		dispatch(receiveUser(data));
		return res;
	};

export const deleteUser =
	({ id, username, email, newPw }: IDeleteUserArgs) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch(`/api/users/${id}`, {
			method: 'DELETE',
			body: JSON.stringify({ user: { email, newPw } }),
		});
		if (res?.ok) dispatch(logoutUser());
		dispatch(removeUser(username));
		return res;
	};

export const followUser =
	({ followingId, followerId }: IFollowArgs) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch('/api/follows', {
			method: 'POST',
			body: JSON.stringify({ follow: { followerId, followingId } }),
		});
		const data = await res.json();
		dispatch(receiveAllUsers(data));
		return res;
	};

export const unfollowUser =
	({ followingId, followerId }: IFollowArgs) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch('/api/follows/1', {
			method: 'DELETE',
			body: JSON.stringify({ follow: { followerId, followingId } }),
		});
		const data = await res.json();
		dispatch(receiveAllUsers(data));
		return res;
	};
