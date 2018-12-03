import React from 'react'
import T from 'prop-types'
import { Button } from '../../Atoms/Button'
import { Modal } from '../../Molecules/Modal'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('accept-modal')

const _propTypes = {
  warnText: T.string.isRequired,
  onAccept: T.func.isRequired,
  onDecline: T.func.isRequired,
  warnDetails: T.node
}

const _defaultProps = {
  warnDetails: null
}

export const AcceptModal = ({ warnText, onAccept, onDecline, warnDetails }) => {

  return (
    <Modal mix={cn().className} onClose={onDecline}>
      <p {...cn('warn-text')}>{warnText}</p>
      {warnDetails && (
        <div {...cn('warn-details')}>{warnDetails}</div>
      )}
      <Button mix={cn('accept-button').className} onClick={onAccept}>Подтверждаю</Button>
      <Button onClick={onDecline}>Отмена</Button>
    </Modal>
  )
}

AcceptModal.propTypes = _propTypes
AcceptModal.defaultProps = _defaultProps
