import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeeds } from "../../../store/feeds"
import { createFeed } from "../../../store/feed"
import Page from './page';

function mapStateToProps(state) {
  const { authorized } = state.authorization;
  return { ...state.feeds, authorized };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { fetchFeeds, createFeed },
    dispatch);
  return { ...actions };
}

export const FeedsPage = connect(mapStateToProps, mapDispatchToProps)(Page);
