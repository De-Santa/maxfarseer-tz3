import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import update from 'immutability-helper'
import bemHelper from 'utils/bem-helper'
import { Redirect } from 'react-router'
import { toast } from 'react-toastify'
import { required } from '../../utils/validateHelpers'
import InputText from '../../ui/Atoms/InputText'
import { Button } from '../../ui/Atoms/Button'
import './styles.scss'

const cn = bemHelper('edit-feed-page')

const validationConfig = {
  title: [required],
  content: [required],
};

export class EditFeedPage extends Component {
  static propTypes = {
    loading: T.bool.isRequired,
    loaded: T.bool.isRequired,
    error: T.bool.isRequired,
    authorized: T.bool.isRequired,
    isNew: T.bool.isRequired,
    fetchFeed: T.func.isRequired,
    feedId: T.string.isRequired,
    createFeed: T.func.isRequired,
    updateFeed: T.func.isRequired,
    history: T.object.isRequired,
    feed: T.object
  }

  static defaultProps = {
    feed: {}
  }

  state = {
    submitAttempt: false,
    valid: false,
    fields: {
      title: '',
      content: '',
    },
    errors: {}
  }

  componentDidMount() {
    const { isNew, fetchFeed, feedId } = this.props
    !isNew && fetchFeed(feedId)
  }

  componentDidUpdate(prevProps) {
    const { loaded, feed } = this.props;
    if (loaded && feed !== prevProps.feed) {
      const { title, content } = feed
      this.setState({fields: {title, content}})
    }
  }

  // validates all form on submit or only one field on change
  _validate = (fieldsToValidate) => {
    const { fields: allFields, errors: currentErrors } = this.state
    const fields = fieldsToValidate || allFields
    const detectedErrors = {}

    Object.keys(fields).forEach(fieldName => {
      if (validationConfig[fieldName]) {
        validationConfig[fieldName].forEach(validation => {
          if (detectedErrors[fieldName]) return;
          detectedErrors[fieldName] = validation(fields[fieldName])
        })
      }
    });

    const mergedErrors = { ...currentErrors, ...detectedErrors }

    const valid = Object.values(mergedErrors).filter(x => !!x).length === 0;

    this.setState((currentState) => ({
      submitAttempt: true,
      valid,
      errors: update(currentState.errors, {
        $set: { ...mergedErrors }
      })
    }))

    return valid;
  };

  onFieldChange = (fieldName) => (e) => {
    const { submitAttempt } = this.state;
    const value = e.currentTarget.value;

    this.setState((currentState) => (
        { fields: update(currentState.fields, { [fieldName]: { $set: value } }) }),
      () => submitAttempt && this._validate({ [fieldName]: value })
    );
  };

  onSubmit = isNew => e => {
    e.preventDefault();
    const { createFeed, updateFeed, feedId, history } = this.props
    const { fields } = this.state
    const formValid = this._validate()

    if (formValid) {
      isNew
        ? createFeed({...fields})
          .then(() => {
            toast.success('Новость успешно добавлена!')
            history.push('/')
          })
          .catch(error => toast.error(`Ошибка при добавлении новости: ${error.message}`))
        : updateFeed(feedId, {...fields})
          .then(() => {
            toast.success('Новость успешно отредактирована!')
            history.push('/')
          })
          .catch(error => toast.error(`Ошибка при редактировании новости: ${error.message}`))
    }
  };

  render() {
    const { authorized, isNew, history } = this.props
    const {
      fields: {
        title,
        content
      },
      errors,
      valid,
      submitAttempt
    } = this.state

    return (
      <Fragment>
        {authorized
          ? (
            <div {...cn()}>
              <h1 {...cn('title')}>{isNew ? 'Добавить новость' : 'Редактировать новость'}</h1>
              <form
                {...cn('form')}
                onSubmit={this.onSubmit(isNew)}
              >
                <InputText
                  mix={cn('input').className}
                  label={'Заголовок новости'}
                  value={title}
                  onChange={this.onFieldChange('title')}
                  error={errors.title}
                />
                <InputText
                  mix={cn('input').className}
                  label={'Текст новости'}
                  type="textarea"
                  rows="10"
                  value={content}
                  onChange={this.onFieldChange('content')}
                  error={errors.content}
                />
                {submitAttempt && !valid
                  ? <Button disabled>Исправьте ошибки в форме</Button>
                  : (
                    <Button
                      type="submit"
                    >
                      {isNew ? 'Добавить' : 'Сохранить'}
                    </Button>
                  )
                }
                <Button
                  onClick={() => history.goBack()}
                >
                  Отмена
                </Button>
              </form>
            </div>
          )
          : <Redirect to="/" />
        }
      </Fragment>

    )
  }
}