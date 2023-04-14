import csrfFetch from "./csrf";

export const savePin = async ({ boardId, pinId}) => {
  const res = await csrfFetch('/api/board_pins', {
    method: "POST",
    body: JSON.stringify({ boardPin: { boardId, pinId }})
  });
  return res;
};