import csrfFetch from "./csrf";

// ACTION TYPES
const RECEIVE_PIN = 'pins/RECEIVE_PIN';
const RECEIVE_ALL_PINS = 'pins/RECEIVE_ALL_PINS';
const REMOVE_PIN = 'pins/REMOVE_PIN';


// ACTIONS
export const receivePin = (pin) => {
  return {
    type: RECEIVE_PIN,
    payload: pin
  };
};

export const receiveAllPins = (pins) => {
  return {
    type: RECEIVE_ALL_PINS,
    payload: pins
  };
};

export const removePin = (pinId) => {
  return {
    type: REMOVE_PIN,
    payload: pinId
  }
}


// THUNK ACTION CREATORS
export const fetchPin = (pinId) => async dispatch => {
  const res = await csrfFetch(`/api/pins/${pinId}`)
  let data = await res.json();
  dispatch(receivePin(data));
  return res;
};

export const fetchAllPins = () => async dispatch => {
  const res = await csrfFetch('/api/pins')
  let data = await res.json();
  dispatch(receiveAllPins(data));
  return res;
}

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
  return data;
};

export const deletePin = (pinId) => async dispatch => {
  const res = await csrfFetch(`/api/pins/${pinId}`, {
    method: "DELETE"
  })
  dispatch(removePin(pinId));
  return res;
};

export const updatePin = (pin) => async dispatch => {
  const res = await csrfFetch(`/api/pins/${pin.id}`, {
    method: "PATCH",
    body: JSON.stringify({ pin: pin})
  });
  const data = res.json();
  dispatch(receivePin(data));
  return res;
};


// REDUCER
const pinsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_PIN:
      return { ...nextState, ...action.payload};
    case RECEIVE_ALL_PINS:
      return { ...nextState, ...action.payload};
    case REMOVE_PIN:
      delete nextState[action.payload]
      return { ...nextState };
    default:
      return state;
  };
};

export default pinsReducer;