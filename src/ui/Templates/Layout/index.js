import React from 'react'
import T from 'prop-types'
import { withRouter } from 'react-router'
import { ToastContainer, Flip } from 'react-toastify';
import bemHelper from 'utils/bem-helper'
import { Header } from "../../Organisms/Header"
import './styles.scss'

const cn = bemHelper('layout')

const _propTypes = {
  children: T.node.isRequired
}

const Layout = ({ children, location: { pathname } }) => (
  <main {...cn()}>
    <Header mix={cn('header').className} pathname={pathname} />
    <div {...cn('content')}>{ children }</div>
    <ToastContainer
      position="bottom-center"
      transition={Flip}
    />
  </main>
)

Layout.propTypes = _propTypes

export default withRouter(Layout)