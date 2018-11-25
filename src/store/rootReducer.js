import { combineReducers } from 'redux';
import authorization from './authorization'
import feeds from './feeds'

export default combineReducers({
  authorization,
  feeds
});
