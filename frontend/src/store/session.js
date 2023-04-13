import csrfFetch from "./csrf";

// ACTION TYPES
const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';


// ACTIONS
export const receiveSession = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const removeSession = () => {
  return {
    type: LOGOUT,
    payload: null
  };
};


// SELECTOR METHOD
export const getCurrentUser = (state) => {
  return state?.session?.user ? state.session.user : null;
};


// THUNK ACTION CREATORS
export const loginUser = ({ email, password }) => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: "POST",
    body: JSON.stringify({email, password})
  });
  let data = await res.json();
  storeCurrentUser(data);
  dispatch(receiveSession(data));
  return res;
};

export const logoutUser = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: "DELETE"
  });
  dispatch(removeSession());
  storeCurrentUser(null);
  return res;
};

export const signupUser = ({ email, password }) => async dispatch => {
  const res = await csrfFetch('/api/users', {
    method: "POST",
    body: JSON.stringify({ user: { email, password }})
  });
  const data = await res.json();
  dispatch(receiveSession(data));
  storeCurrentUser(data);
  return res;
};

export const restoreSession = () => async dispatch => {
  const res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(receiveSession(data.user));
  return res;
};


// HELPER METHODS
const storeCurrentUser = user => { 
  if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
  else sessionStorage.removeItem('currentUser');
}

function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}


// REDUCER
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
const initialState = { user: currentUser }
const sessionReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN:
      return { user: action.payload};
    case LOGOUT:
      return { user: action.payload};
    default:
      return state;
  }
}

export default sessionReducer;