import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '../../Atoms/Button'
import { Logo } from '../../Atoms/Logo'
import { SvgSprite } from '../../Atoms/SvgSprite'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('header')

export default class Header extends Component {
  static propTypes = {
    authorized: T.bool.isRequired,
    signOut: T.func.isRequired,
    pathname: T.string.isRequired,
    userInfo: T.object
  }

  static defaultProps = {
    userInfo: null,
  }

  render() {
    const {
      mix, authorized, signOut, userInfo, pathname
    } = this.props

    const isInnerRoute = pathname !== '/'

    return (
      <header {...cn('', {theme_dark: isInnerRoute}, mix)}>
        { isInnerRoute && (
          <Link {...cn('back-home')} to="/">
            <SvgSprite use="back" mix={cn('back-home-icon').className} />
            <span>На главную</span>
          </Link>
        )}
        <Logo />
        <div {...cn('auth')}>
          {authorized ? (
            <Fragment>
              <img {...cn('user-avatar')} src={userInfo.avatar} alt={userInfo.firstName} />
              <div {...cn('user-name')}>{userInfo.firstName}</div>
              <Button
                onClick={signOut}
                theme={isInnerRoute ? 'light' : 'dark'}
              >
                Выйти
              </Button>
            </Fragment>
          )
            : (
              <Button
                type="link"
                to="/login"
                theme={isInnerRoute ? 'light' : 'dark'}
              >
                Войти
              </Button>
            )
          }
        </div>
      </header>
    )
  }
}