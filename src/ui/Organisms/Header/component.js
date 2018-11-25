import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { Button } from "../../Atoms/Button";
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
    userInfo: T.object,
  }

  static defaultProps = {
    userInfo: null,
  }

  render() {
    const { mix, authorized, gApiLoading, gApiLoaded, gApiError, signIn, signOut, userInfo } = this.props

    return (
      <header {...cn('', '', mix)}>
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