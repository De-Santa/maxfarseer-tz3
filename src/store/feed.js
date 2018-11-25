import { FETCH, ADD, UPDATE, REMOVE, START, SUCCESS, ERROR  } from '../constants/common'

const FEED = 'FEED'

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  payload: null
};

export default (feed = initialState, { type, data }) => {
  switch (type) {
    case FETCH + FEED + START:
      return {
        ...feed, loading: true
      };
    case FETCH + FEED + SUCCESS:
      return {
        ...feed, loading: false, loaded: true, payload: data
      };
    case FETCH + FEED + ERROR:
      return {
        ...feed, loading: false, error: true
      };
    default: return feed
  }
};

export const createFeed = feedData => (dispatch, getState, api) => {
  const { authorization: { token } } = getState()
  api.feeds.create(token, feedData)
    .then(res => {
      console.log(`create feed result`, res)
      // dispatch({ type: FETCH + FEED + SUCCESS, data: res.body.feeds})
    })
    .catch(err => {
      console.log(`create feed error`, err)
    })
};

export const fetchFeed = feedId => (dispatch, getState, api) => {
  dispatch({ type: FETCH + FEED + START })
  api.feeds.getById(feedId)
    .then(res => {
      console.log(`fetch feed ${feedId} result`, res)
      dispatch({ type: FETCH + FEED + SUCCESS, data: res})
    })
    .catch(err => {
      console.log(`fetch feed ${feedId} error`, err)
    })
};