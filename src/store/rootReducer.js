import { combineReducers } from 'redux';
import authorization from './authorization'
import feeds from './feeds'
import feed from './feed'

export default combineReducers({
  authorization,
  feeds,
  feed
});
