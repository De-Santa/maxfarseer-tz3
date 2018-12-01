import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('user-panel');

export const UserPanel = ({ mix, userInfo }) => (
  <div {...cn(null, null, mix)}>
    <p {...cn('greeting')}>Привет {userInfo.fullName}!</p>
  </div>
)

UserPanel.propTypes = {
  mix: T.string,
  userInfo: T.object.isRequired
};

UserPanel.defaulrProps = {
  mix: ''
};
