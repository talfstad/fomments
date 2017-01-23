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

export const CommentText = (props) => {
  const {
    comment,
    truncated,
    setTruncated,
    collapsed,
    setCollapsed } = props;

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
    const handleSeeMore = (e) => {
      e.preventDefault();
      setTruncated(false);
    };

    const handleSetCollapsed = (e) => {
      e.preventDefault();
      setCollapsed(false);
    };

    if (collapsed) {
      return (
        <span className="collapsed">
          <em>This comment is collapsed. </em>
          <a onClick={e => handleSetCollapsed(e)} href="#df">Undo</a>
        </span>
      );
    }

    if (truncated) {
      const truncatedContent = content.substring(0, 600);
      return (
        <span>
          {truncatedContent}
          <span className="see-more">... <span> <a onClick={e => handleSeeMore(e)} href="#see-more">See More</a></span></span>
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
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
  setTruncated: PropTypes.func,
};

export const CommentInfo = (props) => {
  const {
    setReplyShowing,
    comment,
    addLike,
    removeLike,
    collapsed,
  } = props;

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

  if (collapsed) return null;

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
