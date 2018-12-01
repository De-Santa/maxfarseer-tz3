import React, { Component, Fragment } from 'react'
import bemHelper from 'utils/bem-helper'
import { RoundButton } from '../../ui/Atoms/RoundButton'
import { FeedCard } from '../../ui/Molecules/FeedCard'
import { UserPanel } from '../../ui/Molecules/UserPanel'
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
    history: T.object.isRequired,
    userInfo: T.object,
    feeds: T.array
  }

  static defaultProps = {
    payload: [],
    userInfo: {}
  }

  componentDidMount() {
    const { loading, fetchFeeds } = this.props
    !loading && fetchFeeds()
  }

  render() {
    const {
      loading, loaded, error, feeds, authorized, userInfo, history
    } = this.props
    return (
      <div {...cn()}>
        {authorized && (
          <Fragment>
            <UserPanel userInfo={userInfo} />
            <RoundButton
              mix={cn('new-feed-btn').className}
              onClick={() => history.push('/edit/new')}
              title="Добавить новость"
            >
              +
            </RoundButton>
          </Fragment>
        )}
        {loading && 'Загрузка новостей'}
        {error && 'Ошибка при загрузке новостей'}
        {loaded && (
          feeds.length === 0
            ? `Новостей нет =(`
            : (
                <div {...cn('feeds-container')}>
                  {feeds.map(feed => (
                    <FeedCard
                      key={feed._id}
                      mix={cn('feed-card').className}
                      authorized={authorized}
                      userInfo={userInfo}
                      onCardClick={() => history.push(`/watch/${feed._id}`)}
                      {...feed}
                    />
                  ))}
                </div>
            )
          )
        }
      </div>
    )
  }
}