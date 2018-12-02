import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { SvgSprite } from '../../Atoms/SvgSprite'
import { trimString } from '../../../utils/trimString'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('feed-card')

const _propTypes = {
  mix: T.string,
  _id: T.string.isRequired,
  content: T.string.isRequired,
  creator: T.object.isRequired,
  createDate: T.string.isRequired,
  onCardClick: T.func.isRequired,
  title: T.string.isRequired,
  authorized: T.bool.isRequired,
  userInfo: T.object
}

const _defaultProps = {
  mix: '',
  userInfo: {}
}

export const FeedCard = ({
  mix, _id, content, creator, title, createDate, authorized, userInfo, onCardClick
}) => {
  const userIsCreator = authorized && creator._id === userInfo.id
  const trimmedContent = content.length > 100 ? trimString(content) : content

  return (
    <div {...cn(null, null, mix)} onClick={onCardClick}>
      <div {...cn('info')}>
        <h2 {...cn('title')}>{title}</h2>
        <p {...cn('date')}>{createDate}</p>
      </div>
      {userIsCreator && (
        <div {...cn('controls')}>
          <Link
            to={`/edit/${_id}`}
            onClick={e => e.stopPropagation()}
          >
            <SvgSprite
              use="edit"
              mix={cn('edit-icon').className}
              title="Редактировать новость"
            />
          </Link>
          <SvgSprite
            use="delete"
            mix={cn('delete-icon').className}
            title="Удалить новость"
          />
        </div>
      )}
      <p {...cn('content')}>{trimmedContent}</p>
      <p {...cn('author')}>{creator.displayName}</p>
    </div>
  )
}

FeedCard.propTypes = _propTypes
FeedCard.defaultProps = _defaultProps
