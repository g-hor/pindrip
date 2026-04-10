import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import usersReducer from './user';
import pinsReducer from './pin';
import boardsReducer from './board';

const store = configureStore({
	reducer: {
		session: sessionReducer,
		users: usersReducer,
		pins: pinsReducer,
		boards: boardsReducer,
	},
	middleware: (getDefaultMiddleware) => {
		if (import.meta.env.DEV) {
			const { createLogger } = require('redux-logger');
			return getDefaultMiddleware().concat(createLogger());
		}
		return getDefaultMiddleware();
	},
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
