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
  const res = await csrfFetch('/api/users', {
    method: "GET"
  });
  let data = await res.json();
  debugger;
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
  const nextState = { ...state };
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...nextState, ...action.payload };
    case GET_USER:
      return nextState[action.payload.id] = action.payload ;
    default:
      return state;
  }
};

export default usersReducer;