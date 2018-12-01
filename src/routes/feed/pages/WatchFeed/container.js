import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeed } from "../../../../store/feed";
import Page from './page';

function mapStateToProps(state) {
  const { payload: feed, ...fetchStatus } = state.feed;
  return { feed, ...fetchStatus };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { fetchFeed },
    dispatch);
  return { ...actions };
}

export const WatchFeedPage = connect(mapStateToProps, mapDispatchToProps)(Page);
