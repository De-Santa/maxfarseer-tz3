import React, { Component, Fragment } from 'react'
import T from 'prop-types'
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
                  <InputText
                    mix={cn('login').className}
                    label={'Логин'}
                    //value=''
                    // onChange={this.onFieldChange('title')}
                  />
                  <InputText
                    mix={cn('password').className}
                    label={'Пароль'}
                    //value=''
                    type="password"
                    // onChange={this.onFieldChange('title')}
                  />
                  <Button type="submit">Зарегистрироваться</Button>
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