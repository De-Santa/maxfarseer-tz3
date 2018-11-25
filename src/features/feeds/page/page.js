import React, { Component } from 'react';
import bemHelper from 'utils/bem-helper'
import T from "prop-types";

const cn = bemHelper('home-page')

export default class FeedsPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    fetchFeeds: T.func.isRequired,
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
    const { loading, loaded, error, payload } = this.props
    return (
      <div {...cn()}>
        {loading && 'Загрузка новостей'}
        {loaded && `Новости загружены, ${payload}`}
        {error && 'Ошибка при загрузке новостей'}
      </div>
    )
  }
}