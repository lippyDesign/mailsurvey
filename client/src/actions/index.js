import axios from 'axios';
import { FETCH_USER } from './types';

// returns the dispatch function, which will wait for the current user data to come back and only than it will dispatch the action
// using axios library, fetch currently logged in user from the back end
// we pill data prop of the big axios response, because we only care about the data, so no reason to pass the whole object to reducer
export const fetchUser = () => async dispatch => {
  const { data } = await axios.get('/api/current-user');
  dispatch({ type: FETCH_USER, payload: data })
};