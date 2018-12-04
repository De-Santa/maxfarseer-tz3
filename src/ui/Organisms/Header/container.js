import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'store/authorization'
import Component from './component'

function mapStateToProps(state) {
  const { authorized, userInfo} = state.authorization

  return { authorized, userInfo };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { signOut },
    dispatch)
  return { ...actions }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component)
