import csrfFetch from "./csrf";

// ACTION TYPES
const RECEIVE_BOARD = 'boards/RECEIVE_BOARD';
const RECEIVE_ALL_BOARDS = 'boards/RECEIVE_ALL_BOARDS';
const REMOVE_BOARD = 'boards/REMOVE_BOARD';


// ACTIONS
export const receiveBoard = (board) => {
  return {
    type: RECEIVE_BOARD,
    payload: board
  };
};

export const receiveAllBoards = (boards) => {
  return {
    type: RECEIVE_ALL_BOARDS,
    payload: boards
  };
};

export const removeBoard = (boardId) => {
  return {
    type: REMOVE_BOARD,
    payload: boardId
  };
};


// THUNK ACTION CREATORS
export const fetchBoard = (boardId) => async dispatch => {
  const res = await csrfFetch(`/api/boards/${boardId}`);
  let data = await res.json();
  dispatch(receiveBoard(data));
  return res;
};

export const fetchAllBoards = (userId) => async dispatch => {
  const res = await csrfFetch(`/api/users/${userId}/boards`);
  const data = await res.json();
  dispatch(receiveAllBoards(data));
  return res;
}

export const createBoard = (board) => async dispatch => {
  const res = await csrfFetch('/api/boards', {
    method: "POST",
    body: JSON.stringify({board: { ...board }})
  });
  const data = await res.json();
  dispatch(receiveBoard(data));
  return res;
}

export const deleteBoard = (boardId) => async dispatch => {
  const res = await csrfFetch(`/api/boards/${boardId}`, {
    method: "DELETE"
  });
  dispatch(removeBoard(boardId));
  return res;
};


// REDUCER
const boardsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch(action.type) {
    case RECEIVE_BOARD:
      return { ...nextState, ...action.payload };
    case RECEIVE_ALL_BOARDS:
      return { ...action.payload };
    case REMOVE_BOARD:
      delete nextState[action.payload]
      return { ...nextState };
    default:
      return state;
  };
};

export default boardsReducer;