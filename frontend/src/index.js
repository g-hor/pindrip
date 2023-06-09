import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/index';
import csrfFetch from './store/csrf';
import { ModalProvider } from './context/modal';
import * as sessionActions from './store/session';
import * as userActions from './store/user';
import './index.css';



const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.userActions = userActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ModalProvider>
        <Root />
      </ModalProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null || 
    sessionStorage.getItem('currentUser') === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApp);
} else {
  renderApp();
}