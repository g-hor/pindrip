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

export const createPin = ({ title, description, altText, website, photo }) => async dispatch => {
  const formData = new FormData();
  formData.append('pin[title]', title);
  formData.append('pin[description]', description);
  formData.append('pin[altText]', altText);
  formData.append('pin[website]', website);
  formData.append('pin[photo]', photo);
  const res = await csrfFetch(`/api/pins`, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  dispatch(receivePin(data));
  return res;
};


// REDUCER
const pinsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_PIN:
      return { ...nextState, ...action.payload}
    default:
      return state;
  };
};

export default pinsReducer;