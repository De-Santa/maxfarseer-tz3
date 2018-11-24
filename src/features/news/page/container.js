import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn, signOut } from 'store/authorization';
import Page from './page';

function mapStateToProps(state) {
  return { ...state.authorization };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { signIn, signOut },
    dispatch);
  return { ...actions };
}

export const NewsPage = connect(mapStateToProps, mapDispatchToProps)(Page);
