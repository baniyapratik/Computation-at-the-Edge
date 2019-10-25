import _ from 'lodash';
import {
  ADD_NODE,
  EDIT_NODE,
  DELETE_NODE,
  FETCH_NODE,
  FETCH_NODES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NODES:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case ADD_NODE:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_NODE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_NODE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_NODE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
