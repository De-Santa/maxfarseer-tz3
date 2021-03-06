import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { SvgSprite } from '../../Atoms/SvgSprite'
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
  onRemoveClick: T.func.isRequired,
  title: T.string.isRequired,
  authorized: T.bool.isRequired,
  userInfo: T.object
}

const _defaultProps = {
  mix: '',
  userInfo: {}
}

export const FeedCard = ({
  mix, _id, content, creator, title, createDate, authorized, userInfo, onCardClick, onRemoveClick
}) => {
  const userIsCreator = authorized && creator._id === userInfo.id

  return (
    <div {...cn(null, null, mix)}>
      <div {...cn('info')}>
        <h2
          {...cn('title')}
          onClick={onCardClick}
          title="Перейти к новости"
        >
          {title}
        </h2>
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
            onClick={e => {
              e.stopPropagation()
              onRemoveClick()
            }}
          />
        </div>
      )}
      <p {...cn('content')}>{content}</p>
      <div {...cn('author')}>
        <span>{creator.displayName}</span>
        {userIsCreator && (
          <SvgSprite
            mix={cn('author-icon').className}
            use="user"
            title="Вы автор данной новости"
          />
        )}
      </div>
    </div>
  )
}

FeedCard.propTypes = _propTypes
FeedCard.defaultProps = _defaultProps
