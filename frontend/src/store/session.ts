import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser, TThunkDispatch } from '../types';
import csrfFetch from './csrf';

// SLICE
type TSessionState = { user: IUser | null };

const initialState: TSessionState = {
	user: JSON.parse(sessionStorage.getItem('currentUser') || 'null'),
};

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		receiveSession(state, action: PayloadAction<IUser | null>) {
			state.user = action.payload;
		},
		removeSession(state) {
			state.user = null;
		},
	},
});

export const { receiveSession, removeSession } = sessionSlice.actions;
export default sessionSlice.reducer;


// SELECTOR
export const getCurrentUser = (state: any): IUser | null => {
	return state?.session?.user ?? null;
};


// HELPER METHODS
export const storeCurrentUser = (user: IUser | null): void => {
	if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
	else sessionStorage.removeItem('currentUser');
};

function storeCSRFToken(response: Response): void {
	const csrfToken = response.headers.get('X-CSRF-Token');
	if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}


// THUNKS
export const loginUser =
	({ email, password }: { email: string; password: string }) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch('/api/session', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		storeCurrentUser(data);
		dispatch(receiveSession(data));
		return res;
	};

export const logoutUser = () => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch('/api/session', { method: 'DELETE' });
	dispatch(removeSession());
	storeCurrentUser(null);
	return res;
};

export const signupUser =
	({ email, password }: { email: string; password: string }) =>
	async (dispatch: TThunkDispatch): Promise<Response> => {
		const res = await csrfFetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ user: { email, password } }),
		});
		const data = await res.json();
		dispatch(receiveSession(data));
		storeCurrentUser(data);
		return res;
	};

export const restoreSession = () => async (dispatch: TThunkDispatch): Promise<Response> => {
	const res = await csrfFetch('/api/session');
	storeCSRFToken(res);
	const data = await res.json();
	storeCurrentUser(data.user);
	dispatch(receiveSession(data.user));
	return res;
};
