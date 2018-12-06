import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { api } from '../../store/api'
import { toast } from 'react-toastify'
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
    googleSignIn: T.func.isRequired,
    history: T.object.isRequired
  }

  state = {
    login: '',
    password: ''
  }

  componentDidUpdate(prevProps) {
    const { gApiLoaded, googleSignIn } = this.props
    if (prevProps.gApiLoaded !== gApiLoaded) {
      gApiLoaded && googleSignIn()
    }
  }

  onFieldChange = fieldName => e => {
    this.setState({[fieldName]: e.currentTarget.value})
  }

  onSubmit = e => {
    const { signIn } = this.props
    e.preventDefault();
    const { login, password } = this.state
    api.authorization.signIn({username: login, password})
      .then(res => signIn(res.body.token))
      .catch(err => toast.error(err.response.body.error))
  }

  render() {
    const {
      gApiLoading, gApiLoaded, gApiError, authorized, googleSignIn, initGoogleApi
    } = this.props
    const { login, password } = this.state

    return (
      <Fragment>
        {!authorized
          ? (
            <MinimalLayout mix={cn().className}>
              <Card mix={cn('card').className}>
                <Logo mix={cn('logo').className} size="30px" />
                <form {...cn('form')} onSubmit={this.onSubmit}>
                  <div {...cn('form-fields')}>
                  <InputText
                    mix={cn('form-input').className}
                    label={'Логин'}
                    value={login}
                    onChange={this.onFieldChange('login')}
                  />
                  <InputText
                    mix={cn('form-input').className}
                    label={'Пароль'}
                    value={password}
                    type="password"
                    onChange={this.onFieldChange('password')}
                  />
                  </div>
                  <Button mix={cn('submit').className} type="submit">Вход</Button>
                  <Button type="link" to="/">Отмена</Button>
                </form>
                <Link {...cn('register')} to="/sign-up">Регистрация</Link>
              </Card>
              <button
                {...cn('google-sign-in')}
                onClick={() => gApiLoaded ? googleSignIn() : initGoogleApi()}
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