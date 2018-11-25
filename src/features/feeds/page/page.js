import React, { Component } from 'react'
import bemHelper from 'utils/bem-helper'
import T from 'prop-types'

const cn = bemHelper('home-page')

export default class FeedsPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    fetchFeeds: T.func.isRequired,
    createFeed: T.func.isRequired,
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
    const { loading, loaded, error, payload, createFeed, authorized } = this.props
    return (
      <div {...cn()}>
        {authorized && (
          <button
            onClick={() => createFeed({
              title: 'Тест новость',
              content: `Рандомное число: ${Math.random()}`
            })}
          >
            Создать тест-новость
          </button>
        )}
        {loading && 'Загрузка новостей'}
        {loaded && `Новости загружены, ${payload}`}
        {error && 'Ошибка при загрузке новостей'}
      </div>
    )
  }
}