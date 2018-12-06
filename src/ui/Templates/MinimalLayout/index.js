import React from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('minimal-layout')

export const MinimalLayout = ({ children, mix }) => (
  <main {...cn(null, null, mix)}>
    {children}
  </main>
)

MinimalLayout.propTypes = {
  children: T.node.isRequired,
  mix: T.string
}
MinimalLayout.defaultProps = {
  mix: ''
}