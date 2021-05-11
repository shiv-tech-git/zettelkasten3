import { LOGIN, LOGOUT } from '../types';

const initialState = JSON.parse(localStorage.getItem('userData')) || {};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const newState = {
        isAuthorised : true,
        userData: action.payload
      }
      localStorage.setItem('userData', JSON.stringify(newState))
      return newState;
    case LOGOUT:
      localStorage.removeItem('userData');
      return {
        isAuthorised : false,
        userData: {}
      };
    default:
      return state;
  }
}