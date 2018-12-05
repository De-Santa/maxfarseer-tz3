import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { SvgSprite } from '../../ui/Atoms/SvgSprite'
import { Loader } from '../../ui/Atoms/Loader'
import { Button } from '../../ui/Atoms/Button'
import { Logo } from '../../ui/Atoms/Logo'
import { InputText } from '../../ui/Atoms/InputText'
import { Card } from '../../ui/Atoms/Card'
import { MinimalLayout } from '../../ui/Templates/MinimalLayout'
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
    signIn: T.func.isRequired,
    history: T.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const { gApiLoaded, signIn } = this.props
    if (prevProps.gApiLoaded !== gApiLoaded) {
      gApiLoaded && signIn()
    }
  }

  render() {
    const {
      gApiLoading, gApiLoaded, gApiError, authorized, signIn, initGoogleApi
    } = this.props
    return (
      <Fragment>
        {!authorized
          ? (
            <MinimalLayout mix={cn().className}>
              <Card mix={cn('card').className}>
                <Logo mix={cn('logo').className} size="30px" />
                <form {...cn('form')}>
                  <div {...cn('form-fields')}>
                  <InputText
                    mix={cn('form-input').className}
                    label={'Логин'}
                    //value=''
                    // onChange={this.onFieldChange('title')}
                  />
                  <InputText
                    mix={cn('form-input').className}
                    label={'Пароль'}
                    //value=''
                    type="password"
                    // onChange={this.onFieldChange('title')}
                  />
                  </div>
                  <Button mix={cn('submit').className} type="submit">Вход</Button>
                  <Button type="link" to="/">Отмена</Button>
                </form>
                <Link {...cn('register')} to="/sign-up">Регистрация</Link>
              </Card>
              <button
                {...cn('google-sign-in')}
                onClick={() => gApiLoaded ? signIn() : initGoogleApi()}
              >
                <span>
                  {gApiError
                    ? "Ошибка при загрузке Google API"
                    : "Войти с помощью Google"
                  }
                </span>
                {gApiLoading
                  ? <Loader size="20px" />
                  : (
                    <SvgSprite
                      use="google"
                      mix={cn('google-sign-in-icon').className}
                    />
                  )
                }
              </button>
            </MinimalLayout>
          )
          : <Redirect to="/" />
        }
      </Fragment>

    )
  }
}