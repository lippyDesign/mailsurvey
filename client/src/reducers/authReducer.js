import { FETCH_USER } from '../actions/types';

const INITIAL_STATE = {
  currentUser: null
}

// Auth Reducer
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_USER:
      // we return false if user object is user an empty string (if user is not logged in)
      return { ...state, currentUser: action.payload || false };
    default: return state;
  }
}