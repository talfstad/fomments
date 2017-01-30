import React, { PropTypes } from 'react';

const CommentPaging = (props) => {
  const { showing, total, defaultCommentsToLoadAtOnce } = props;

  const handleShowMoreComments = (e) => {
    e.preventDefault();
    props.handleShowMoreComments();
  };

  if (showing === total) return null;
  const newTotalShowing = showing + defaultCommentsToLoadAtOnce;
  const toLoadText = (newTotalShowing >= total) ? total - showing : defaultCommentsToLoadAtOnce;

  return (
    <div className="load-more-comments">
      <button onClick={e => handleShowMoreComments(e)}>
        <em>Load {toLoadText} more {`${toLoadText === 1 ? 'comment' : 'comments'}`}</em>
      </button>
    </div>
  );
};

CommentPaging.propTypes = {
  showing: PropTypes.number,
  total: PropTypes.number,
  defaultCommentsToLoadAtOnce: PropTypes.number,
};

export default CommentPaging;
