import React, { PropTypes } from 'react';

export const ProfilePic = ({ user }) => {
  if (user.url) {
    return (
      <div className="profile-pic">
        <a target="_blank" rel="noopener noreferrer" href={user.url}>
          <img src={user.image} alt="" />
        </a>
      </div>
    );
  }

  return (
    <div className="profile-pic">
      <img src={user.image} alt="" />
    </div>
  );
};

ProfilePic.propTypes = {
  user: PropTypes.shape({}),
};

export const CommentText = ({ comment, truncated, setTruncated }) => {
  const { content, user } = comment;
  const buildAffiliation = () => {
    if (user.affiliation.name) {
      return (
        <span>
          <span className="dot"> · </span>
          <a className="page" target="_blank" rel="noopener noreferrer" href={user.affiliation.url}>
            {user.affiliation.name}
          </a>
        </span>
      );
    }
    return '';
  };

  const buildUserName = () => {
    if (user.url) {
      return (
        <a className="name" target="_blank" rel="noopener noreferrer" href={user.url}>
          {user.name}
        </a>
      );
    }
    return (
      <span className="name">
        {user.name}
      </span>
    );
  };

  const buildCommentContent = () => {
    if (truncated) {
      const truncatedContent = content.substring(0, 600);
      return (
        <span>
          {truncatedContent}
          <span className="see-more">... <span> <a onClick={() => setTruncated(false)} href="#see-more">See More</a></span></span>
        </span>
      );
    }

    return (
      <span>
        {content}
      </span>
    );
  };

  return (
    <div className="row">
      <div className="user-info">
        {buildUserName()}
        {buildAffiliation()}
      </div>
      <div className="comment-text">
        {buildCommentContent()}
      </div>
    </div>
  );
};

CommentText.propTypes = {
  comment: PropTypes.shape({}),
  truncated: PropTypes.bool,
  setTruncated: PropTypes.func,
};

export const CommentInfo = ({ setReplyShowing, comment, addLike, removeLike }) => {
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

  const handleSetReply = (e) => {
    e.preventDefault();
    e.currentTarget.blur();
    setReplyShowing(true);
  };

  return (
    <div className="row comment-info">
      {buildLikeLink()}
      <span className="dot"> · </span>
      <a onClick={e => handleSetReply(e)} href="#reply"><em>Reply</em></a>
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
  setReplyShowing: PropTypes.func,
};
