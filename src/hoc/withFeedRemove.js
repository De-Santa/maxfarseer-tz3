import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { removeFeed } from '../store/feed'
import { fetchFeeds } from '../store/feeds'
import { toast } from 'react-toastify'
import { AcceptModal } from '../ui/Organisms/AcceptModal';

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ removeFeed, fetchFeeds }, dispatch);
  return { ...actions };
}

const withFeedRemoveHOC = WrappedComponent => class extends Component {
  static propTypes = {
    removeFeed: T.func.isRequired,
    fetchFeeds: T.func.isRequired
  }

  state = {
    modalActive: false,
    removeFeedId: null,
    onFeedRemove: null
  }

  hideModal = () => {
    this.setState({
      modalActive: false,
      removeFeedId: null,
      onFeedRemove: null
    })
  }

  showModal = (feedId, onFeedRemove) => {
    this.setState({
      modalActive: true,
      removeFeedId: feedId,
      onFeedRemove
    })
  }

  removeFeed = () => {
    const { removeFeedId, onFeedRemove } = this.state
    const { removeFeed, fetchFeeds } = this.props

    removeFeed(removeFeedId)
      .then(() => {
        fetchFeeds()
        this.hideModal()
        toast.success('Новость успешно удалена!')
        typeof onFeedRemove === 'function' && onFeedRemove()
      })
      .catch(error => {
        this.closeRemoveModal()
        toast.error(`Ошибка при удалении новости: ${error.message}`)
      })
  }

  render() {
    const { ...wrappedComponentProps } = this.props;

    const { modalActive } = this.state;
    return (
      <Fragment>
        <WrappedComponent
          {...wrappedComponentProps}
          removeFeed={this.showModal}
        />
        {modalActive && (
          <AcceptModal
            warnText="Подтверите удаление новости"
            onAccept={this.removeFeed}
            onDecline={this.hideModal}
          />
        )}
      </Fragment>

    );
  }
};

export const withFeedRemove = compose(
  connect(null, mapDispatchToProps),
  withFeedRemoveHOC
)
