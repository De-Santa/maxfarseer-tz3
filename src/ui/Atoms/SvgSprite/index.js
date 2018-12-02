import React from 'react'
import * as T from "prop-types"
import SPRITE from './svg-sprite.svg'
import bemHelper from 'utils/bem-helper'

const cn = bemHelper('svg-icon')

export const SvgSprite = ({mix, use, ...props}) => (
  <div
    {...cn(null, null, mix)}
    {...props}
  >
    <svg style={{width: 'inherit', height: 'inherit', fill: 'inherit'}}>
      <use
        xlinkHref={`${SPRITE}#${use}`}
        style={{pointerEvents: 'none'}}
      />
    </svg>
  </div>
)

SvgSprite.propTypes = {
  use: T.string.isRequired,
  mix: T.string,
  onClick: T.func
}