import React, { Component } from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './styles.less';

const cn = bemHelper('input-text');

class InputText extends Component {
  state = {
    focused: false
  };

  toggleFocus = () => {
    this.setState((prevState) => ({ focused: !prevState.focused }));
  };

  render() {
    const {
      mix, type, value, label, withIcon, error, theme, ...props
    } = this.props;
    const { focused } = this.state;

    return (
      <fieldset
        {...cn(
          '',
          {
            'has-error': !!error,
            'has-icon': withIcon,
            theme,
            filled: !!value,
            focused,
            textarea: type === 'textarea'
          },
          mix
        )}
      >
        <div {...cn('input-wrap')}>
          {type === 'textarea'
            ? (
              <textarea
                value={value}
                {...props}
                onFocus={this.toggleFocus}
                onBlur={this.toggleFocus}
                {...cn('input')}
              />
            )
            : (
              <input
                value={value}
                type={type}
                {...props}
                onFocus={this.toggleFocus}
                onBlur={this.toggleFocus}
                {...cn('input')}
              />
            )
          }
          <label {...cn('label')}>{label}</label>
        </div>
        <hr {...cn('underline')} />
        <div {...cn('error')}>{error}</div>
      </fieldset>
    );
  }
}

InputText.propTypes = {
  mix: T.string,
  type: T.oneOf(['text', 'password', 'tel', 'email', 'textarea', 'number']),
  theme: T.oneOf(['blue', 'white']),
  error: T.string,
  onChange: T.func,
  value: T.oneOfType([
    T.string,
    T.number
  ]),
  placeholder: T.string,
  label: T.string,
  withIcon: T.bool
};

InputText.defaultProps = {
  mix: '',
  type: 'text',
  theme: 'blue',
  onChange: () => {},
  withIcon: false,
  error: '',
  placeholder: '',
  label: '',
  value: null
};

export default InputText;
