import { INIT, START, SUCCESS, ERROR, REMOVE  } from '../constants/common'
import { parseJwt } from '../utils/parseJwt'

const AUTHORIZATION = 'AUTHORIZATION'
const GOOGLE_API = 'GOOGLE_API'

const initialState = {
  authorized: false,
  gApiInstance: null,
  gApiLoading: false,
  gApiLoaded: false,
  gApiError: false,
  token: null,
  userInfo: null
};

export default (authorization = initialState, { type, data }) => {
  switch (type) {
    case INIT + GOOGLE_API + START:
      return {
        ...authorization, gApiLoading: true
      };
    case INIT + GOOGLE_API + SUCCESS:
      return {
        ...authorization, gApiLoading: false, gApiLoaded: true, gApiInstance: data
      };
    case INIT + GOOGLE_API + ERROR:
      return {
        ...authorization, gApiLoading: false, gApiError: true
      };
    case AUTHORIZATION + SUCCESS:
      const { token, userInfo } = data
      return {
        ...authorization, authorized: true, token, userInfo
      };
    case REMOVE + AUTHORIZATION:
      return {
        ...authorization, authorized: false, token: null, userInfo: null
      };
    default: return authorization
  }
};

export const initGoogleApi = () => dispatch => {
  dispatch({ type: INIT + GOOGLE_API + START });
  const _loadApi = async () => {
    if(window.gapi) {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({ client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID })
          .then(
            instance => {
              dispatch({ type: INIT + GOOGLE_API + SUCCESS, data: instance })
            },
            () => dispatch({ type: INIT + GOOGLE_API + ERROR })
          )
      })
    } else { setTimeout(() => { _loadApi() }, 100) }
  }
  _loadApi()
};

export const googleSignIn = () => (dispatch, getState, api) => {
  const { authorization: { gApiInstance } } = getState()
  gApiInstance.signIn()
    .then(googleUser => {
      const googleToken = googleUser.getAuthResponse().id_token

      api.authorization.googleSignIn(googleToken)
        .then(res => {
          const profile = googleUser.getBasicProfile()
          const token = res.body.token
          const userInfo = {
            avatar: profile.getImageUrl(),
            email: profile.getEmail(),
            familyName: profile.getFamilyName(),
            firstName: profile.getGivenName(),
            fullName: profile.getName(),
            id: parseJwt(token).id,
          }

          dispatch({ type: AUTHORIZATION + SUCCESS, data: { token, userInfo }})
        })
        .catch(err => {
          console.log('backend auth error', err)
        })
    })
};

export const signIn = jwtToken => (dispatch, getState, api) => {
  const userId = parseJwt(jwtToken).id
  api.authorization.getUserInfo(userId, jwtToken)
    .then(res => {
      const userInfo = {
        avatar: 'http://www.realmofdarkness.net/sb/wp-content/uploads/2015/12/desanta-02.png',
        email: '',
        familyName: res.body.user.displayName,
        firstName: res.body.user.displayName,
        fullName: '',
        id: userId
      }
      dispatch({ type: AUTHORIZATION + SUCCESS, data: { token: jwtToken, userInfo }})
    })
};

export const signOut = () => (dispatch, getState) => {
  const { authorization: { gApiInstance } } = getState()
  if (gApiInstance) {
    gApiInstance.signOut()
      .then(() => { dispatch({ type: REMOVE + AUTHORIZATION  }) })
  } else {
    dispatch({ type: REMOVE + AUTHORIZATION  })
  }

};
