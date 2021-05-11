import { combineReducers } from "redux";
import { authReducer } from './reducers/authReducer';
import { noteReducer } from './reducers/noteReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer
})