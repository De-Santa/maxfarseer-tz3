import { ADD, FETCH, START, SUCCESS, ERROR, LOCALLY, FEEDS, FEED  } from '../constants/common'
import { parseDate } from '../utils/parseDate';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  payload: null
};

export default (feeds = initialState, { type, data }) => {
  switch (type) {
    case FETCH + FEEDS + START:
      return {
        ...feeds, loading: true
      };
    case FETCH + FEEDS + SUCCESS:
      return {
        ...feeds, loading: false, loaded: true, payload: data
      };
    case FETCH + FEEDS + ERROR:
      return {
        ...feeds, loading: false, error: true
      };
    case ADD + FEED + LOCALLY:
      return {
        ...feeds, payload: data
      };
    default: return feeds
  }
};

export const fetchFeeds = () => (dispatch, getState, api) => {
  dispatch({ type: FETCH + FEEDS + START })
  api.feeds.getAll()
    .then(res => {
      const normalisedFeeds = res.body.feeds.length > 0
        ? res.body
          .feeds.map(feed => ({...feed, createDate: parseDate(feed.createDate) }))
          .reverse()
        : res.body.feeds
      dispatch({ type: FETCH + FEEDS + SUCCESS, data: normalisedFeeds})
    })
    .catch(() => {
      dispatch({ type: FETCH + FEEDS + ERROR })
    })
};

export const addFeedLocally = createdFeed  => (dispatch, getState) => {
  const { feeds: { payload } } = getState()
  dispatch({ type: ADD + FEED + LOCALLY, data: [createdFeed, ...payload]})
};