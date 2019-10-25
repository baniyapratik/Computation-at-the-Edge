import nodes from '../apis/nodes';
import axios from 'axios';
import history from '../history';
import {
  FETCH_USER,
  ADD_NODE,
  EDIT_NODE,
  DELETE_NODE,
  FETCH_NODE,
  FETCH_NODES
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current-user');
  dispatch({ type: FETCH_USER, payload: res });
};

export const addNode = formValues => async (dispatch, getState) => {
  const { _id } = getState().auth.data;
  const response = await nodes.post('/api/nodes', formValues);

  dispatch({ type: ADD_NODE, payload: response.data });
  console.log('Node added');
  history.push('/nodes/show');
};

export const deleteNode = id => async dispatch => {
  await nodes.delete(`/api/nodes/${id}`);
  dispatch({ type: DELETE_NODE, payload: id });
  history.push('/nodes/show');
};

export const editNode = (id, formValues) => async dispatch => {
  const response = await nodes.put(`/api/nodes/${id}`, formValues);
  dispatch({ type: EDIT_NODE, payload: response.data });
};

export const fetchNode = id => async dispatch => {
  const response = await nodes.get(`/api/nodes/${id}`);
  dispatch({ type: FETCH_NODE, payload: response.data });
};

export const fetchNodes = () => async dispatch => {
  const response = await nodes.get('/api/nodes');
  dispatch({ type: FETCH_NODES, payload: response.data });
};
