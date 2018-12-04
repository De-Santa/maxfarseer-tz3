import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeed } from '../../store/feed';
import { withFeedRemove } from '../../hoc/withFeedRemove'
import { WatchFeedPage } from './page';

function mapStateToProps(state, ownProps) {
  const { match: { params: { id } } } = ownProps;

  const { authorized, userInfo } = state.authorization;
  const { payload: feed, ...fetchStatus } = state.feed;

  return { authorized, userInfo, feed, feedId: id, ...fetchStatus  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { fetchFeed },
    dispatch);
  return { ...actions };
}

export const WatchFeedRoute = connect(mapStateToProps, mapDispatchToProps)(withFeedRemove(WatchFeedPage));
