import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('feed-card');

export const FeedCard = ({
  mix, content, creator, title, createDate
}) => (
  <div {...cn(null, null, mix)}>
    <div {...cn('top')}>
      <div {...cn('info')}>
        <h2 {...cn('title')}>{title}</h2>
        <p {...cn('date')}>{createDate}</p>
      </div>
    </div>
    <p {...cn('content')}>{content}</p>
    <p {...cn('author')}>{creator.displayName}</p>
  </div>
)

FeedCard.propTypes = {
  mix: T.string,
  content: T.string.isRequired,
  creator: T.object.isRequired,
  createDate: T.string.isRequired,
  title: T.string.isRequired
};

FeedCard.defaulrProps = {
  mix: ''
};
