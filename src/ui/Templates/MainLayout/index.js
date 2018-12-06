import React from 'react'
import T from 'prop-types'
import { withRouter } from 'react-router'
import bemHelper from 'utils/bem-helper'
import { Header } from '../../Organisms/Header'
import { SvgSprite } from '../../Atoms/SvgSprite'
import './styles.scss'

const cn = bemHelper('layout')

const _propTypes = {
  children: T.node.isRequired
}

const Layout = ({ children, location: { pathname } }) => (
  <main {...cn()}>
    <Header mix={cn('header').className} pathname={pathname} />
    <div {...cn('content')}>{ children }</div>
    <footer {...cn('footer')}>
      <span {...cn('footer-left')}>"Без воды", тестовое задание #3</span>
      <span {...cn('footer-right')}>
        <a href='https://t.me/De_Santa' target="_blank" rel="noopener noreferrer">
          <span>De_Santa</span> <SvgSprite use="gta" mix={cn('footer-icon').className}/>
        </a>
      </span>
    </footer>
  </main>
)

Layout.propTypes = _propTypes

export default withRouter(Layout)