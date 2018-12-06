import React from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('fetch-info')

export const FetchInfo = ({ children, theme, message }) => (
  <div {...cn(null, { theme })}>
    <p {...cn('message')}>{message}</p>
    {children && (
      <div {...cn('extra-content')}>
        {children}
      </div>
    )}
  </div>
)

FetchInfo.propTypes = {
  message: T.string.isRequired,
  children: T.node,
  theme: T.oneOf('light', 'dark')
}
FetchInfo.defaultProps = {
  children: null,
  theme: 'light'
}