import React, { Component, Fragment } from 'react'
import bemHelper from 'utils/bem-helper'
import { toast } from 'react-toastify'
import { RoundButton } from '../../ui/Atoms/RoundButton'
import { Button } from '../../ui/Atoms/Button'
import { SvgSprite } from '../../ui/Atoms/SvgSprite'
import { FeedCard } from '../../ui/Molecules/FeedCard'
import { Modal } from '../../ui/Molecules/Modal'
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
    removeFeed: T.func.isRequired,
    history: T.object.isRequired,
    userInfo: T.object,
    feeds: T.array
  }

  static defaultProps = {
    feeds: [],
    userInfo: null
  }

  state = {
    removeModalActive: false,
    removeFeedId: null
  }

  componentDidMount() {
    const { loading, fetchFeeds } = this.props
    !loading && fetchFeeds()
  }

  openRemoveModal = feedId => {
    this.setState({
      removeModalActive: true,
      removeFeedId: feedId
    })
  }

  closeRemoveModal = () => {
    this.setState({
      removeModalActive: false,
      removeFeedId: null
    })
  }

  handleFeedRemove = () => {
    const { removeFeedId } = this.state
    const { removeFeed, fetchFeeds } = this.props

    removeFeed(removeFeedId)
      .then(() => {
        fetchFeeds()
        this.closeRemoveModal()
        toast.success('Новость успешно удалена!')
      })
      .catch(error => {
        this.closeRemoveModal()
        toast.error(`Ошибка при удалении новости: ${error.message}`)
      })
  }

  render() {
    const { removeModalActive } = this.state
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
              <SvgSprite mix={cn('new-feed-icon').className} use="add-new" />
            </RoundButton>
            {removeModalActive && (
              <Modal onClose={this.closeRemoveModal}>
                <p {...cn('remove-modal-title')}>Подтверите удаление новости</p>
                <div {...cn('remove-modal-buttons')}>
                  <Button onClick={this.handleFeedRemove}>Подтверждаю</Button>
                  <Button onClick={this.closeRemoveModal}>Отмена</Button>
                </div>
              </Modal>
            )}
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
                      onRemoveClick={this.openRemoveModal}
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