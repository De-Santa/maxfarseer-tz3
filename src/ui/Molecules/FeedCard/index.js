import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('feed-card');

const _propTypes = {
  mix: T.string,
  content: T.string.isRequired,
  creator: T.object.isRequired,
  createDate: T.string.isRequired,
  title: T.string.isRequired
}

const _defaultProps = {
  mix: ''
}

export const FeedCard = ({
  mix, content, creator, title, createDate, authorized, userInfo
}) => {
  const userIsCreator = authorized && creator._id === userInfo.id

  return (
    <div {...cn(null, null, mix)}>
      <div {...cn('top')}>
        {userIsCreator && (
          <div {...cn('controls')}>
            Вы автор!
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
