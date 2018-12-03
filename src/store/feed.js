import { FETCH, START, SUCCESS, ERROR, FEED } from '../constants/common'
import { parseDate } from '../utils/parseDate';

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
        ...feed, loading: true, loaded: false, error: false
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
  return (
    api.feeds.create(token, feedData)
      .then(res => res.body.feed)
  )
};

export const updateFeed = (feedId, feedData) => (dispatch, getState, api) => {
  const { authorization: { token } } = getState()
  return (
    api.feeds.update(token, feedId, feedData)
      .then(res => res.body.feed)
  )
};

export const removeFeed = feedId => (dispatch, getState, api) => {
  const { authorization: { token } } = getState()
  return (
    api.feeds.remove(token, feedId)
      .then(res => res)
  )
};

export const fetchFeed = feedId => (dispatch, getState, api) => {
  dispatch({ type: FETCH + FEED + START })
  api.feeds.getById(feedId)
    .then(res => {
      dispatch({
        type: FETCH + FEED + SUCCESS,
        data: {...res.body.feed, createDate: parseDate(res.body.feed.createDate)}
      })
    })
    .catch(() => {
      dispatch({ type: FETCH + FEED + ERROR })
    })
};