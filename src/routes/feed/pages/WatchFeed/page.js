import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { withFeedRemove } from '../../../../hoc/withFeedRemove'
import { Button } from '../../../../ui/Atoms/Button'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('watch-feed-page')

class WatchFeedPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    fetchFeed: T.func.isRequired,
    removeFeed: T.func.isRequired,
    history: T.object.isRequired,
    feedId: T.string.isRequired,
    feed: T.object,
    userInfo: T.object
  }

  static defaultProps = {
    feed: null,
    userInfo: null
  }

  componentDidMount() {
    const { loading, fetchFeed, feedId } = this.props
    !loading && fetchFeed(feedId)
  }

  render() {
    const {
      loading, loaded, error, feedId, feed, authorized, userInfo, removeFeed, history
    } = this.props
    return (
      <div {...cn()}>
        {loading && 'Загрузка новости'}
        {error && 'Ошибка при загрузке новости'}
        {loaded && (
          <Fragment>
            {authorized && feed.creator._id === userInfo.id && (
              <Fragment>
                <Button
                  type="link"
                  to={`/edit/${feedId}`}
                >
                  Редактировать
                </Button>
                <Button
                  onClick={() => (
                    removeFeed(feedId, () => history.push('/'))
                  )}
                >
                  Удалить
                </Button>
              </Fragment>
            )}
            <h1 {...cn('title')}>{feed.title}</h1>
            <p {...cn('author')}>{feed.creator.displayName}</p>
            <p {...cn('create-date')}>{feed.createDate}</p>
            <p {...cn('content')}>{feed.content}</p>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withFeedRemove(WatchFeedPage)