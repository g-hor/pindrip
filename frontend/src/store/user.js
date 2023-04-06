import csrfFetch from "./csrf";

// FORMATTING HELPER METHODS
export const getInitial = (user) => {
  if (user.username) {
    return user.username[0].toUpperCase();
  } else {
    return formatEmail(user.email)[0]
  }
}

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

export const formatEmail = (emailAddress) => {
  const email = emailAddress.split("@")[0];
  return capitalizeFirstLetter(email);
};


// ACTION TYPES
const RECEIVE_ALL_USERS = 'users/RECEIVE_USERS';
const RECEIVE_USER = 'users/RECEIVE_USER';


// ACTIONS
export const receiveAllUsers = (users) => {
  return {
    type: RECEIVE_ALL_USERS,
    payload: users
  };
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    payload: user
  };
};


// THUNK ACTION CREATORS
export const fetchAllUsers = () => async dispatch => {
  const res = await csrfFetch('/api/users');
  let data = await res.json();
  dispatch(receiveAllUsers(data));
  return res;
};

export const fetchUser = (username) => async dispatch => {
  const res = await csrfFetch(`/api/users/${username}`);
  let data = await res.json();
  dispatch(receiveUser(data));
  return res;
};


// REDUCER
const usersReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return { ...nextState, ...action.payload };
    case RECEIVE_USER:
      return { ...nextState, [action.payload.username]: action.payload };
    default:
      return state;
  }
};

export default usersReducer;