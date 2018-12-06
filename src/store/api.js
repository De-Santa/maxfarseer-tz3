import request from 'superagent';

const apiEndpoint = 'http://127.0.0.1:5000/api/v1'

export const api = {
  authorization: {
    signUp: data => (
      request
        .post(`${apiEndpoint}/users`)
        .send(data)
        .then(res => res)
    ),
    signIn: data => (
      request
        .post(`${apiEndpoint}/auth`)
        .send(data)
        .then(res => res)
    ),
    googleSignIn: googleToken => (
      request
        .post(`${apiEndpoint}/auth/google`)
        .send({token: googleToken})
        .then(res => res)
    ),
    getUserInfo: (userId, jwtToken) => (
      request
        .get(`${apiEndpoint}/users/${userId}`)
        .set('x-access-token', jwtToken)
        .then(res => res)
    )
  },
  feeds: {
    getAll: () => (
      request
        .get(`${apiEndpoint}/feeds`)
        .then(res => res)
    ),
    getById: feedId => (
      request
        .get(`${apiEndpoint}/feeds/${feedId}`)
        .then(res => res)
    ),
    create: (token, data) => (
      request
        .post(`${apiEndpoint}/feeds`)
        .set('x-access-token', token)
        .send(data)
        .then(res => res)
    ),
    update: (token, feedId, data) => (
      request
        .put(`${apiEndpoint}/feeds/${feedId}`)
        .set('x-access-token', token)
        .send(data)
        .then(res => res)
    ),
    remove: (token, feedId) => (
      request
        .delete(`${apiEndpoint}/feeds/${feedId}`)
        .set('x-access-token', token)
        .then(res => res)
    )
  }
}