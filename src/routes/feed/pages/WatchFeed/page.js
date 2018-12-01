import React, { Component } from 'react'
import bemHelper from 'utils/bem-helper'
import T from 'prop-types'
import './styles.scss'

const cn = bemHelper('watch-feed-page')

export default class WatchFeedPage extends Component {
/*  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    fetchFeed: T.func.isRequired,
    feed: T.object()
  }

  static defaultProps = {
    feed: {}
  }*/

  componentDidMount() {
    const { loading, fetchFeed } = this.props
    !loading && fetchFeed('123')
  }

  render() {
    return (
      <div {...cn()}>
        Watch Feed Page
      </div>
    )
  }
}