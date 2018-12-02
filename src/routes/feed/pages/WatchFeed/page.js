import React, { Component } from 'react'
import bemHelper from 'utils/bem-helper'
import T from 'prop-types'
import './styles.scss'

const cn = bemHelper('watch-feed-page')

export default class WatchFeedPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    fetchFeed: T.func.isRequired,
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
    const { loading, loaded, error, feed } = this.props
    console.log('feed', feed)
    return (
      <div {...cn()}>
        {loading && 'Загрузка новости'}
        {error && 'Ошибка при загрузке новости'}
        {loaded && (
          <div>
            Тут будет новость
          </div>
        )}
      </div>
    )
  }
}