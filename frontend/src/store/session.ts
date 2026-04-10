import { AnyAction } from 'redux';
import type { IUser } from '../types';
import csrfFetch from './csrf';

// ACTION TYPES
const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';


// ACTIONS
export const receiveSession = (user: IUser | null) => ({
	type: LOGIN,
	payload: user,
});

export const removeSession = () => ({
	type: LOGOUT,
	payload: null,
});


// SELECTOR METHOD
export const getCurrentUser = (state: any): IUser | null => {
	return state?.session?.user ? state.session.user : null;
};


// THUNK ACTION CREATORS
export const loginUser =
	({ email, password }: { email: string; password: string }) =>
	async (dispatch: any) => {
		const res = await csrfFetch('/api/session', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});
		let data = await res.json();
		storeCurrentUser(data);
		dispatch(receiveSession(data));
		return res;
	};

export const logoutUser = () => async (dispatch: any) => {
	const res = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	dispatch(removeSession());
	storeCurrentUser(null);
	return res;
};

export const signupUser =
	({ email, password }: { email: string; password: string }) =>
	async (dispatch: any) => {
		const res = await csrfFetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ user: { email, password } }),
		});
		const data = await res.json();
		dispatch(receiveSession(data));
		storeCurrentUser(data);
		return res;
	};

export const restoreSession = () => async (dispatch: any) => {
	const res = await csrfFetch('/api/session');
	storeCSRFToken(res);
	const data = await res.json();
	storeCurrentUser(data.user);
	dispatch(receiveSession(data.user));
	return res;
};


// HELPER METHODS
export const storeCurrentUser = (user: IUser | null) => {
	if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
	else sessionStorage.removeItem('currentUser');
};

function storeCSRFToken(response: Response) {
	const csrfToken = response.headers.get('X-CSRF-Token');
	if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}


// REDUCER
type TSessionState = { user: IUser | null };

const currentUser: IUser | null = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
const initialState: TSessionState = { user: currentUser };

const sessionReducer = (state: TSessionState = initialState, action: AnyAction): TSessionState => {
	switch (action.type) {
		case LOGIN:
			return { user: action.payload };
		case LOGOUT:
			return { user: action.payload };
		default:
			return state;
	}
};

export default sessionReducer;
