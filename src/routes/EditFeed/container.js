import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createFeed, updateFeed, fetchFeed } from '../../store/feed'
import { EditFeedPage } from './page'

function mapStateToProps(state, ownProps) {
  const { match: { params: { id } } } = ownProps

  const { authorized } = state.authorization;
  const { payload: feed, ...fetchStatus } = state.feed;
  const isNew = id === 'new'

  return { authorized, isNew, feed, feedId: id, ...fetchStatus  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { fetchFeed, createFeed, updateFeed },
    dispatch);
  return { ...actions }
}

export const EditFeedRoute = connect(mapStateToProps, mapDispatchToProps)(EditFeedPage)
