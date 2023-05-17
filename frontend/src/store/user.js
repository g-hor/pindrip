import csrfFetch from "./csrf";
import { logoutUser, storeCurrentUser } from "./session";

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
const REMOVE_USER = 'users/REMOVE_USER';


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

export const removeUser = (username) => {
  return {
    type: REMOVE_USER,
    payload: username
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

export const updateUser = (user) => async dispatch => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify({user: { ...user }})
  });
  const data = await res.json();
  storeCurrentUser(data);
  dispatch(receiveUser(data));
  return res;
};

export const updatePassword = ({ id, email, oldPw, newPw }) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({user: { email, oldPw, newPw }})
  });
  const data = await res.json();
  dispatch(receiveUser(data));
  return res;
};

export const deleteUser = ({ id, username, email, newPw }) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "DELETE",
    body: JSON.stringify({user: { email, newPw }})
  });
  if (res.ok) dispatch(logoutUser());
  dispatch(removeUser(username));
  return res;
}


// REDUCER
const usersReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return { ...nextState, ...action.payload };
    case RECEIVE_USER:
      if (action.payload.username) {
        return { ...nextState, [action.payload.username]: action.payload };
      } else {
        return { ...nextState, ...action.payload };
      }
    case REMOVE_USER:
      delete nextState[action.payload];
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;