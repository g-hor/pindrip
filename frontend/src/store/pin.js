import csrfFetch from "./csrf";

// ACTION TYPES
const RECEIVE_PIN = 'pins/RECEIVE_PINS'


// ACTIONS
export const receivePin = (pin) => {
  return {
    type: RECEIVE_PIN,
    payload: pin
  };
};


// THUNK ACTION CREATORS
export const fetchPin = (pinId) => async dispatch => {
  const res = await csrfFetch(`/api/pins/${pinId}`)
  let data = await res.json();
  dispatch(receivePin(data));
  return res;
};

export const createPin = (userId, pin) => async dispatch => {
  const res = await csrfFetch(`/api/users/${userId}/pins`, {
    method: "POST",
    body: pin
  });
  const data = await res.json();
  dispatch(receivePin(data));
  return res;
};


// REDUCER
const pinsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PIN:
      return { ...state, [action.payload.id]: action.payload}
    default:
      return state;
  };
};

export default pinsReducer;