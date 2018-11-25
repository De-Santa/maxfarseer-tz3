import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import { Button } from "../../Atoms/Button";
import './styles.scss';

const cn = bemHelper('user-panel');

export const UserPanel = ({ mix, userInfo }) => (
  <div {...cn(null, null, mix)}>
    <p {...cn('greeting')}>Привет {userInfo.fullName}!</p>
    <Button mix={cn('add-btn').className}>Добавить новость</Button>
  </div>
)

UserPanel.propTypes = {
  mix: T.string,
  userInfo: T.object.isRequired
};

UserPanel.defaulrProps = {
  mix: ''
};
