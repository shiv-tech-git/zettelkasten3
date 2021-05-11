import { ADD_NOTES } from '../types';

const initialState = {};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTES:
      action.payload.forEach((note) => {
        state[note.id] = note
      })
      return state;
    default:
      return state;
  }
}