import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initGoogleApi } from 'store/authorization';
import Component from './component';

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { initGoogleApi },
    dispatch);
  return { ...actions };
}

export const Layout = connect(null, mapDispatchToProps)(Component);
