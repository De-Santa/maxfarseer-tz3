import React, { Component } from 'react'
import T from 'prop-types'
// import { SvgSprite } from '../../ui/Atoms/SvgSprite'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('login-page')

export class LoginPage extends Component {
  static propTypes = {
    gApiLoading: T.bool.isRequired,
    gApiLoaded: T.bool.isRequired,
    gApiError: T.bool.isRequired,
    authorized: T.bool.isRequired,
    initGoogleApi: T.func.isRequired,
    history: T.object.isRequired
  }

  componentDidMount() {
    const { gApiLoading, initGoogleApi } = this.props
    !gApiLoading && initGoogleApi()
  }

  render() {
    const {
      gApiLoading, gApiLoaded, gApiError, authorized, history
    } = this.props
    return (
      <div {...cn()}>
        {gApiLoading && 'Загрузка апи'}
        {gApiError && 'Ошибка при загрузке апи'}
        {gApiLoaded && (
            <div>
              Страница авторизации
            </div>
          )
        }
      </div>
    )
  }
}