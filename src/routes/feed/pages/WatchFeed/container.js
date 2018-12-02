import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeed, removeFeed } from "../../../../store/feed";
import Page from './page';

function mapStateToProps(state, ownProps) {
  const { match: { params: { id } } } = ownProps;

  const { authorized, userInfo } = state.authorization;
  const { payload: feed, ...fetchStatus } = state.feed;

  return { authorized, userInfo, feed, feedId: id, ...fetchStatus  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { fetchFeed, removeFeed },
    dispatch);
  return { ...actions };
}

export const WatchFeedPage = connect(mapStateToProps, mapDispatchToProps)(Page);
