import React from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('logo')

export const Logo = ({ mix, size, theme }) => (
  <p
    {...cn(null, { theme }, mix)}
    style={{fontSize: size}}
  >
    Farseer<span>News</span>
  </p>
)

Logo.propTypes = {
  mix: T.string,
  size: T.string,
  theme: T.oneOf(['normal', 'inverse'])
}
Logo.defaultProps = {
  mix: '',
  theme: 'normal',
  size: '40px'
}