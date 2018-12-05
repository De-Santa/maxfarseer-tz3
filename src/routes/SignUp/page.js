import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
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
  }

  state = {
    login: '',
    password: '',
    passwordConfirm: '',
    recaptcha: null
  }

  onRecaptchaChange = value => {
    this.setState({recaptcha: value})
  }


  render() {
    const { authorized } = this.props
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
                    <InputText
                      mix={cn('form-input').className}
                      label={'Повторите пароль'}
                      //value=''
                      type="password"
                      // onChange={this.onFieldChange('title')}
                    />
                  </div>
                  <div {...cn('recaptcha')}>
                    <ReCAPTCHA
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