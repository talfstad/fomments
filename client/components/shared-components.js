import React, { PropTypes } from 'react';

export const CommentInfo = ({ comment, addLike, removeLike }) => {
  const { likes, date } = comment;

  const buildLikes = () => {
    if (likes > 0) {
      return (
        <span>
          <span className="dot"> · </span>
          <span>
            <i className="like-icon" /> {likes}
          </span>
        </span>
      );
    }
    return '';
  };

  const handleChangeLikes = (e, shouldAddLike) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (shouldAddLike) {
      addLike(comment);
    } else {
      removeLike(comment);
    }
  };

  const buildLikeLink = () => {
    if (comment.liked) {
      return (
        <a onClick={e => handleChangeLikes(e)} href="#unlike">
          <em>Unlike</em>
        </a>
      );
    }
    return (
      <a onClick={e => handleChangeLikes(e, true)} href="#like">
        <em>Like</em>
      </a>
    );
  };

  return (
    <div className="row comment-info">
      {buildLikeLink()}
      <span className="dot"> · </span>
      <a href="#reply"><em>Reply</em></a>
      {buildLikes()}
      <span className="dot"> · </span>
      {date}
    </div>
  );
};

CommentInfo.propTypes = {
  comment: PropTypes.shape({}),
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
};
