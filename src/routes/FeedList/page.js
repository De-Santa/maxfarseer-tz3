import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { RoundButton } from '../../ui/Atoms/RoundButton'
import { SvgSprite } from '../../ui/Atoms/SvgSprite'
import { Loader } from '../../ui/Atoms/Loader'
import { FeedCard } from '../../ui/Molecules/FeedCard'
import { FetchInfo } from '../../ui/Molecules/FetchInfo'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('feed-list-page')

export class FeedListPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    fetchFeeds: T.func.isRequired,
    removeFeed: T.func.isRequired,
    history: T.object.isRequired,
    userInfo: T.object,
    feeds: T.array,
  }

  static defaultProps = {
    feeds: [],
    userInfo: null
  }

  componentDidMount() {
    const { loading, fetchFeeds } = this.props
    !loading && fetchFeeds()
  }

  render() {
    const {
      loading, loaded, error, feeds, authorized, userInfo, history, removeFeed
    } = this.props
    return (
      <div {...cn()}>
        {loading && <FetchInfo message="Загрузка новостей"><Loader/></FetchInfo>}
        {error && <FetchInfo message="Ошибка при загрузке новостей =(" />}
        {loaded && (
          feeds.length === 0
            ? <FetchInfo message="Новостей нет =(" />
            : (
                <div {...cn('feeds-container')}>
                  {feeds.map(feed => (
                    <FeedCard
                      key={feed._id}
                      mix={cn('feed-card').className}
                      authorized={authorized}
                      userInfo={userInfo}
                      onCardClick={() => history.push(`/watch/${feed._id}`)}
                      onRemoveClick={() => removeFeed(feed._id)}
                      {...feed}
                    />
                  ))}
                </div>
            )
          )
        }
        {authorized && (
          <Fragment>
            <RoundButton
              mix={cn('new-feed-btn').className}
              onClick={() => history.push('/edit/new')}
              title="Добавить новость"
            >
              <SvgSprite mix={cn('new-feed-icon').className} use="add-new" />
            </RoundButton>
          </Fragment>
        )}
      </div>
    )
  }
}