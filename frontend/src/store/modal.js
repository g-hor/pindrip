// ACTION TYPES
const SHOWLOGIN = 'SHOWLOGIN';
const HIDELOGIN = 'HIDELOGIN';
const SHOWSIGNUP = 'SHOWSIGNUP';
const HIDESIGNUP = 'HIDESIGNUP';

// ACTIONS
export const showLogin = () => {
  return {
    type: SHOWLOGIN,
    payload: true
  };
};

export const hideLogin = () => {
  return {
    type: HIDELOGIN,
    payload: false
  };
};

export const showSignup = () => {
  return {
    type: SHOWSIGNUP,
    payload: true
  }
}

export const hideSignup = () => {
  return {
    type: HIDESIGNUP,
    payload: false
  }
}

// REDUCER
const initialState = { bgModalState: false, loginModalState: false, signupModalState: false }
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOWLOGIN:
      return { 
        ...state, 
        loginModalState: action.payload, 
        bgModalState: true 
      }
    case HIDELOGIN: 
      return { 
        ...state, 
        loginModalState: action.payload, 
        bgModalState: false 
      }
    case SHOWSIGNUP:
      return { 
        ...state, 
        signupModalState: action.payload, 
        bgModalState: true 
      }
    case HIDESIGNUP:
      return { 
        ...state, 
        signupModalState: action.payload, 
        bgModalState: false 
      }
    default: 
      return state;
  }
}

export default modalReducer;