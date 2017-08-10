import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; // rename reducer into reduxForm not to be confused later
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});