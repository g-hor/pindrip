import type { EnhancedStore } from '@reduxjs/toolkit';
import type csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as userActions from './store/user';

declare global {
	interface Window {
		store: EnhancedStore;
		csrfFetch: typeof csrfFetch;
		sessionActions: typeof sessionActions;
		userActions: typeof userActions;
	}
}
