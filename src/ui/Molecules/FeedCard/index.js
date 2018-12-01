import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import bemHelper from 'utils/bem-helper'
import './styles.scss'

const cn = bemHelper('feed-card')

const _propTypes = {
  mix: T.string,
  _id: T.string.isRequired,
  content: T.string.isRequired,
  creator: T.object.isRequired,
  createDate: T.string.isRequired,
  title: T.string.isRequired,
  authorized: T.bool.isRequired,
  userInfo: T.object
}

const _defaultProps = {
  mix: '',
  userInfo: {}
}

export const FeedCard = ({
  mix, _id, content, creator, title, createDate, authorized, userInfo
}) => {
  const userIsCreator = authorized && creator._id === userInfo.id

  return (
    <div {...cn(null, null, mix)}>
      <div {...cn('top')}>
        {userIsCreator && (
          <div {...cn('controls')}>
            Вы автор!
            <Link to={`/edit/${_id}`}>Редактировать</Link>
          </div>
        )}
        <div {...cn('info')}>
          <h2 {...cn('title')}>{title}</h2>
          <p {...cn('date')}>{createDate}</p>
        </div>
      </div>
      <p {...cn('content')}>{content}</p>
      <p {...cn('author')}>{creator.displayName}</p>
    </div>
  )
}

FeedCard.propTypes = _propTypes
FeedCard.defaultProps = _defaultProps
