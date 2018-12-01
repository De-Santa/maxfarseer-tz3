import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn, signOut } from 'store/authorization'
import Component from './component'

function mapStateToProps(state) {
  const {
    authorized,
    gApiLoading,
    gApiLoaded,
    gApiError,
    userInfo
  } = state.authorization

  return {
    authorized,
    gApiLoading,
    gApiLoaded,
    gApiError,
    userInfo
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { signIn, signOut },
    dispatch)
  return { ...actions }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component)
