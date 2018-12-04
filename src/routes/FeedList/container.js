import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFeeds } from '../../store/feeds'
import { withFeedRemove } from '../../hoc/withFeedRemove'
import { FeedListPage } from './page'

function mapStateToProps(state) {
  const { authorized, userInfo } = state.authorization;
  const { payload: feeds, ...fetchStatus } = state.feeds
  return { feeds, ...fetchStatus, authorized, userInfo }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ fetchFeeds }, dispatch);
  return { ...actions };
}

export const FeedListRoute = connect(mapStateToProps, mapDispatchToProps)(withFeedRemove(FeedListPage))
