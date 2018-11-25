import React, { Component } from 'react'
import bemHelper from 'utils/bem-helper'
import { FeedCard } from '../../../ui/Molecules/FeedCard'
import T from 'prop-types'
import './styles.scss'

const cn = bemHelper('feeds-page')

export default class FeedsPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    fetchFeeds: T.func.isRequired,
    createFeed: T.func.isRequired,
    addFeedLocally: T.func.isRequired,
    payload: T.array
  }

  static defaultProps = {
    payload: []
  }

  componentDidMount() {
    const { loading, fetchFeeds } = this.props
    !loading && fetchFeeds()
  }

  render() {
    const { loading, loaded, error, payload, createFeed, authorized, addFeedLocally } = this.props
    return (
      <div {...cn()}>
        {authorized && (
          <button
            onClick={() => createFeed({
              title: 'Тест новость',
              content: `Рандомное число: ${Math.random()}`
            }).then(createdFeed => addFeedLocally(createdFeed))}
          >
            Создать тест-новость
          </button>
        )}
        {loading && 'Загрузка новостей'}
        {loaded && (
          payload.length === 0
            ? `Новостей нет =(`
            : payload.map(feed => (
              <FeedCard key={feed._id} mix={cn('feed-card').className} {...feed}/>
            ))
        )}
        {error && 'Ошибка при загрузке новостей'}
      </div>
    )
  }
}