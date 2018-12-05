import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initGoogleApi, signIn } from '../../store/authorization'
import { LoginPage } from './page'

function mapStateToProps(state) {
  const {
    authorized,
    gApiLoading,
    gApiLoaded,
    gApiError
  } = state.authorization

  return {
    authorized,
    gApiLoading,
    gApiLoaded,
    gApiError
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ initGoogleApi, signIn }, dispatch);
  return { ...actions };
}

export const LoginRoute = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
