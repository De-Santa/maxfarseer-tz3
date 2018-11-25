import { FETCH, START, SUCCESS, ERROR  } from '../constants/common'
import { parseDate } from '../utils/parseDate';

const FEEDS = 'FEEDS'

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
    default: return feeds
  }
};

export const fetchFeeds = () => (dispatch, getState, api) => {
  dispatch({ type: FETCH + FEEDS + START })
  api.feeds.getAll()
    .then(res => {
      console.log('fetch all feeds result', res.body.feeds)
      const normalisedFeeds = res.body.feeds.length > 0
        ? res.body.feeds.map(feed => ({...feed, createDate: parseDate(feed.createDate) }))
        : res.body.feeds
      dispatch({ type: FETCH + FEEDS + SUCCESS, data: normalisedFeeds})
    })
    .catch(err => {
      console.log('fetch all feeds error', err)
    })
};