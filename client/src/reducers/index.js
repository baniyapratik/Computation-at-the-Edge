import { combineReducers } from 'redux';
import authReducer from './authReducer';
import nodeReducer from './nodeReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  nodes: nodeReducer
});
