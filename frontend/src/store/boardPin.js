import { receiveBoard } from "./board";
import csrfFetch from "./csrf";

export const savePin = ({ boardId, pinId }) => async dispatch =>  {
  const res = await csrfFetch('/api/board_pins', {
    method: "POST",
    body: JSON.stringify({ boardPin: { boardId, pinId }})
  });
  const data = await res.json();
  dispatch(receiveBoard(data));
  return res;
};

export const removeBoardPin = ({ boardId, pinId }) => async dispatch => {
  const res = await csrfFetch('/api/board_pins/1', {
    method: "DELETE",
    body: JSON.stringify({ boardPin: { boardId, pinId }})
  });
  const data = await res.json();
  dispatch(receiveBoard(data));
  return res;
};