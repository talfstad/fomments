import React, { PropTypes } from 'react';

const CommentPaging = (props) => {
  const { nextCountToLoad, handleShowMoreComments } = props;

  if (nextCountToLoad < 1) return <noscript />;
  return (
    <div className="load-more-comments">
      <button onClick={handleShowMoreComments}>
        <em>Load {nextCountToLoad} more {`${nextCountToLoad === 1 ? 'comment' : 'comments'}`}</em>
      </button>
    </div>
  );
};

CommentPaging.propTypes = {
  nextCountToLoad: PropTypes.number,
  handleShowMoreComments: PropTypes.func,
};

export default CommentPaging;
