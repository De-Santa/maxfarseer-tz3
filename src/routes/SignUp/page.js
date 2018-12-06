import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { api } from '../../store/api';
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router'
import { Button } from '../../ui/Atoms/Button'
import { Logo } from '../../ui/Atoms/Logo'
import { InputText } from '../../ui/Atoms/InputText'
import { Card } from '../../ui/Atoms/Card'
import { MinimalLayout } from '../../ui/Templates/MinimalLayout'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('sign-up-page')

export class SignUpPage extends Component {
  static propTypes = {
    authorized: T.bool.isRequired,
    history: T.object.isRequired
  }

  recaptchaRef = React.createRef()

  state = {
    login: '',
    password: '',
    recaptcha: null
  }

  onFieldChange = fieldName => e => {
    this.setState({[fieldName]: e.currentTarget.value})
  }

  onRecaptchaChange = value => {
    this.setState({recaptcha: value})
  }

  onSubmit = e => {
    e.preventDefault();
    const { login, password, recaptcha } = this.state
    const { history } = this.props
    api.authorization.signUp({username: login, password, "g-recaptcha-response": recaptcha})
      .then(() => {
        toast.success(`Пользователь ${login} успешно создан`)
        history.push('/login')
      })
      .catch(err => {
        this.recaptchaRef.current.reset()
        toast.error(err.response.body.error)
      })
  }

  render() {
    const { authorized } = this.props
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
                  <div {...cn('recaptcha')}>
                    <ReCAPTCHA
                      ref={this.recaptchaRef}
                      sitekey='6LfR-n4UAAAAAB0KD2Aj-MnN5opfeoIdxlRcDO-b'
                      onChange={this.onRecaptchaChange}
                    />
                  </div>
                  <Button mix={cn('submit').className} type="submit">Зарегистрироваться</Button>
                  <Button type="link" to="/login">Отмена</Button>
                </form>
              </Card>
            </MinimalLayout>
          )
          : <Redirect to="/" />
        }
      </Fragment>

    )
  }
}