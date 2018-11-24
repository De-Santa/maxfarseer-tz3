import React, { Component } from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'

const cn = bemHelper('header')

export default class Header extends Component {
  static propTypes = {
    signIn: T.func.isRequired,
    signOut: T.func.isRequired
  }

  render() {
    const { mix } = this.props
    return (
      <header {...cn('', '', mix)}>
        Header
      </header>
    )
  }
}