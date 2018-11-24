import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('button');

export const Button = ({
  mix, type, children, external, to, disabled, onClick, ...props
}) => {
  const className = cn('', { disabled }, mix);

  const _handleClick = (e) => {
    disabled
      ? e.preventDefault()
      : onClick && onClick();
  };

  switch (type) {
    case 'link':
      return (
        external
          ? (
            <a
              {...className}
              href={to}
              target="_blank"
              rel="noreferrer noopener"
              onClick={_handleClick}
              {...props}
            >
              {children}
            </a>
          )
          : <Link {...className} to={to} onClick={_handleClick} {...props}>{children}</Link>
      );
    default:
      return (
        <button
          {...className}
          type={type}
          disabled={disabled}
          onClick={_handleClick}
          {...props}
        >
          {children}
        </button>
      );
  }
};

Button.propTypes = {
  mix: T.string,
  children: T.node.isRequired,
  type: T.string,
  to: T.string,
  external: T.bool,
  disabled: T.bool,
  onClick: T.func
};

Button.defaultProps = {
  type: 'button'
};
