import React from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('logo')

export const Logo = ({ mix, size }) => (
  <p
    {...cn(null, null, mix)}
    style={{fontSize: size}}
  >
    Farseer<span>News</span>
  </p>
)

Logo.propTypes = {
  mix: T.string,
  size: T.string
}
Logo.defaultProps = {
  mix: '',
  size: '40px'
}