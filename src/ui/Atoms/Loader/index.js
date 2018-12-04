import React from 'react';
import * as T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('loader');

export const Loader = ({ mix, size }) => (
  <div {...cn('', '', mix)} style={{ width: size, height: size }}>
    <svg {...cn('spinner')} viewBox="25 25 50 50">
      <circle {...cn('path')} cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
    </svg>
  </div>
);

Loader.propTypes = {
  mix: T.string,
  size: T.string,
};

Loader.defaultProps = {
  mix: '',
  size: '30px'
};
