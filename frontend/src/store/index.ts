import { createStore, combineReducers, applyMiddleware, compose, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './user';
import pinsReducer from './pin';
import boardsReducer from './board';

const rootReducer = combineReducers({
	session: sessionReducer,
	users: usersReducer,
	pins: pinsReducer,
	boards: boardsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState?) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ThunkDispatch<TRootState, undefined, AnyAction>;

export default configureStore;
