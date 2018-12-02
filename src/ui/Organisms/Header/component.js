import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '../../Atoms/Button'
import { SvgSprite } from '../../Atoms/SvgSprite'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('header')

export default class Header extends Component {
  static propTypes = {
    authorized: T.bool.isRequired,
    gApiLoading: T.bool.isRequired,
    gApiLoaded: T.bool.isRequired,
    gApiError: T.bool.isRequired,
    signIn: T.func.isRequired,
    signOut: T.func.isRequired,
    pathname: T.string.isRequired,
    userInfo: T.object
  }

  static defaultProps = {
    userInfo: null,
  }

  render() {
    const {
      mix, authorized, gApiLoading, gApiLoaded, gApiError, signIn, signOut, userInfo, pathname
    } = this.props

    const atInnerRoute = pathname !== '/'

    return (
      <header {...cn('', {theme_dark: atInnerRoute}, mix)}>
        { atInnerRoute && (
          <Link {...cn('back-home')} to="/">
            <SvgSprite use="back" mix={cn('back-home-icon').className} />
            <span>На главную</span>
          </Link>
        )}
        <div {...cn('logo')}>Farseer <span>News</span></div>
        <div {...cn('auth')}>
          {authorized && (
            <Fragment>
              <img {...cn('user-avatar')} src={userInfo.avatar} alt={userInfo.firstName} />
              <div {...cn('user-name')}>{userInfo.firstName}</div>
            </Fragment>
          )}
          <Button
            onClick={authorized ? signOut : signIn}
            disabled={!gApiLoaded}
            theme={atInnerRoute ? 'light' : 'dark'}
          >
            {gApiLoading && 'Инициализация Google API'}
            {gApiError && 'Google API недоступен =('}
            {gApiLoaded
              ? authorized ? 'Выйти' : 'Войти'
              : null
            }
          </Button>
        </div>
      </header>
    )
  }
}