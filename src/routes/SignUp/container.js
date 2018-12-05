import { connect } from 'react-redux'
import { SignUpPage } from './page'

function mapStateToProps(state) {
  const {
    authorized
  } = state.authorization

  return {
    authorized,
  };
}

export const SignUpRoute = connect(mapStateToProps)(SignUpPage);
