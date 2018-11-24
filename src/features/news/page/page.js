import React, { Component } from 'react';
import bemHelper from 'utils/bem-helper'

const cn = bemHelper('home-page')

export default class NewsPage extends Component {

  render() {
    return (
      <div {...cn()}>
        News page
      </div>
    )
  }
}