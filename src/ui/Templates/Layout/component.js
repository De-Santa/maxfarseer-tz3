import React, { Component } from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'
import { Header } from "../../Organisms/Header";

const cn = bemHelper('layout')

export default class Layout extends Component {
  static propTypes = {
    children: T.node.isRequired,
    initGoogleApi: T.func.isRequired
  }

  componentDidMount() {
    const { initGoogleApi } = this.props
    initGoogleApi()
  }

  render() {
    const { children } = this.props
    return (
      <main {...cn()}>
        <Header mix={cn('header').className}/>
        { children }
      </main>
    )
  }
}