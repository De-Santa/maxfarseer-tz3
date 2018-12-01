import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('round-button');

const _propTypes = {
  mix: T.string,
  children: T.node.isRequired,
  type: T.string
}

const _defaultProps = {
  mix: '',
  type: 'button'
}

export const RoundButton = ({
  mix, children, type, ...props
}) => {
  return (
    <button
      {...cn(null, null, mix)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

RoundButton.propTypes = _propTypes
RoundButton.defaultProps = _defaultProps