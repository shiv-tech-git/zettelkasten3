import { LOGIN, LOGOUT, ADD_NOTES } from './types';

export function loginUser(userData) {
  return {
    type: LOGIN,
    payload: userData
  }
}

export function logoutUser() {
  return {
    type: LOGOUT
  }
}

export function addNotes(notes) {
  return {
    type: ADD_NOTES,
    payload: notes
  }
}