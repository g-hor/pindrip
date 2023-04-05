import csrfFetch from "./csrf";

// ACTION TYPES
const GET_ALL_USERS = 'users/GET_USERS';
const GET_USER = 'users/GET_USER';


// ACTIONS
export const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    payload: users
  };
};

export const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user
  };
};


// THUNK ACTION CREATORS
export const fetchAllUsers = () => async dispatch => {
  const res = await csrfFetch('/api/users');
  let data = await res.json();
  dispatch(getAllUsers(data));
  return res;
};

export const fetchUser = (userId) => async dispatch => {
  const res = await csrfFetch(`/api/users/${userId}`);
  let data = await res.json();
  dispatch(getUser(data));
  return res;
};


// REDUCER
const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, ...action.payload };
    case GET_USER:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default usersReducer;