import React, { Component } from 'react'
import bemHelper from 'utils/bem-helper'
import { FeedCard } from '../../../ui/Molecules/FeedCard'
import { UserPanel } from "../../../ui/Molecules/UserPanel";
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
    userInfo: T.object.isRequired,
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
    const {
      loading, loaded, error, payload, authorized, userInfo
    } = this.props
    return (
      <div {...cn()}>
        {authorized && <UserPanel mix={cn('user-panel').className} userInfo={userInfo} />}
        {loading && 'Загрузка новостей'}
        {error && 'Ошибка при загрузке новостей'}
        {loaded && (
          payload.length === 0
            ? `Новостей нет =(`
            : (
                <div {...cn('feeds-container')}>
                  {payload.map(feed => (
                    <FeedCard key={feed._id} mix={cn('feed-card').className} {...feed}/>
                  ))}
                </div>
            )
          )
        }
      </div>
    )
  }
}