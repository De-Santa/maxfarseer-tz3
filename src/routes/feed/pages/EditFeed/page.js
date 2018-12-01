import React, { Component } from 'react'
import bemHelper from 'utils/bem-helper'
import T from 'prop-types'
import './styles.scss'

const cn = bemHelper('edit-feed-page')

export default class EditFeedPage extends Component {
  static propTypes = {
/*    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    fetchFeeds: T.func.isRequired,
    createFeed: T.func.isRequired,
    userInfo: T.object,
    feeds: T.array*/
  }

  static defaultProps = {
/*    payload: [],
    userInfo: {}*/
  }

  render() {
    return (
      <div {...cn()}>
        Edit Feed Page
      </div>
    )
  }
}