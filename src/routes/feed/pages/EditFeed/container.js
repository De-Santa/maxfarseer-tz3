/*import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeeds, addFeedLocally } from "../../store/feeds"
import { createFeed } from "../../store/feed"*/
import Page from './page';

/*function mapStateToProps(state) {
  const { authorized, userInfo } = state.authorization;
  const { payload: feeds, ...fetchStatus } = state.feeds;
  return { feeds, ...fetchStatus, authorized, userInfo };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { fetchFeeds, createFeed, addFeedLocally },
    dispatch);
  return { ...actions };
}*/

// export const EditFeedPage = connect(mapStateToProps, mapDispatchToProps)(Page);
export const EditFeedPage = Page;
