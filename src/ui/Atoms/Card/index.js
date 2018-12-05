import React from 'react'
import T from 'prop-types'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('card')

export const Card = ({ children, mix }) => (
  <div {...cn(null, null, mix)}>
    {children}
  </div>
)

Card.propTypes = {
  children: T.node.isRequired,
  mix: T.string
}
Card.defaultProps = {
  mix: ''
}