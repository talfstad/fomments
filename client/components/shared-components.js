import React, { PropTypes } from 'react';
import moment from 'moment';
import Modal from './modal';

export const sortComments = (comments) => {
  const { user, list, sortBy } = comments;
  const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);
  switch (sortByKey) {
    case 'newest': {
      return Object.keys(list)
        .sort((a, b) => list[b].date - list[a].date)
        .map(key => list[key]);
    }
    case 'oldest': {
      return Object.keys(list)
        .sort((a, b) => list[a].date - list[b].date)
        .map(key => list[key]);
    }
    default: {
      // remove users comments from list
      const userComments = Object.keys(list).filter((key) => {
        const comment = list[key];
        return comment.user.name === user.name;
      })
      .sort((a, b) => list[b].date - list[a].date)
      .map(key => list[key]);

      // sort remaining (remove users comments)
      const sortedComments = Object.keys(list)
        .filter((key) => {
          const comment = list[key];
          return comment.user.name !== user.name;
        })
        .sort((a, b) => list[b].likes - list[a].likes)
        .map(key => list[key]);

      return [
        ...userComments,
        ...sortedComments,
      ];
    }
  }
};

export const ReportCommentModal = ({
  handleDeleteComment,
  showReportCommentModal,
  show,
  marginTop }) => {
  const handleCancelButtonClick = (e) => {
    e.preventDefault();
    showReportCommentModal(false);
  };

  if (show) {
    return (
      <Modal marginTop={marginTop}>
        <div className="fomments-modal-header">
          <h3><em>Report Comment</em></h3>
        </div>
        <div className="fomments-modal-body">
          <em>Are you sure you want to report this comment?</em>
        </div>
        <div className="clearfix fomments-modal-footer">
          <button onClick={() => handleDeleteComment()} className="report pull-right">
            <em>Confirm Report</em>
          </button>
          <button onClick={e => handleCancelButtonClick(e)} className="cancel-comment mr5 pull-right">
            <em>Cancel</em>
          </button>
        </div>
      </Modal>
    );
  }
  return null;
};

ReportCommentModal.propTypes = {
  show: PropTypes.bool,
  marginTop: PropTypes.number,
  handleDeleteComment: PropTypes.func,
  showReportCommentModal: PropTypes.func,
};

export const DeleteCommentModal = ({
  handleDeleteComment,
  showDeleteCommentModal,
  show,
  marginTop }) => {
  const handleCancelButtonClick = (e) => {
    e.preventDefault();
    showDeleteCommentModal(false);
  };

  if (show) {
    return (
      <Modal marginTop={marginTop}>
        <div className="fomments-modal-header">
          <h3><em>Delete Comment</em></h3>
        </div>
        <div className="fomments-modal-body">
          <em>Are you sure you want to delete this comment?</em>
        </div>
        <div className="clearfix fomments-modal-footer">
          <button onClick={() => handleDeleteComment()} className="delete pull-right">
            <em>Confirm Delete</em>
          </button>
          <button onClick={e => handleCancelButtonClick(e)} className="cancel-comment mr5 pull-right">
            <em>Cancel</em>
          </button>
        </div>
      </Modal>
    );
  }
  return null;
};

DeleteCommentModal.propTypes = {
  handleDeleteComment: PropTypes.func,
  showDeleteCommentModal: PropTypes.func,
  show: PropTypes.bool,
  marginTop: PropTypes.number,
};

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
    spam,
    showEdit,
    setCollapsed,
    setSpam } = props;

  if (showEdit) return null;

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

    const handleSetSpam = (e) => {
      e.preventDefault();
      setSpam(false);
    };

    if (spam) {
      return (
        <span className="collapsed">
          <em>This comment is marked as spam. </em>
          <a onClick={e => handleSetSpam(e)} href="#df">Undo</a>
        </span>
      );
    }

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
  showEdit: PropTypes.bool,
  spam: PropTypes.bool,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
  setSpam: PropTypes.func,
  setTruncated: PropTypes.func,
};

export const CommentInfo = (props) => {
  const {
    setReplyShowing,
    comment,
    addLike,
    removeLike,
    collapsed,
    spam,
    showEdit,
    edited,
  } = props;

  if (showEdit) return null;

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

  const showIfEdited = () => {
    if (edited) {
      return (
        <span>
          <span className="dot"> · </span>
          Edited
        </span>
      );
    }
    return null;
  };

  const setDate = () => {
    const now = moment();
    if (!moment(date).add(1, 'day').isBefore(now)) {
      return moment(date).fromNow();
    }
    return moment(date).format('MMM DD, YYYY h:MMa');
  };

  if (collapsed || spam) return null;

  return (
    <div className="row comment-info">
      {buildLikeLink()}
      <span className="dot"> · </span>
      <a onClick={e => handleSetReply(e)} href="#reply"><em>Reply</em></a>
      {buildLikes()}
      <span className="dot"> · </span>
      {setDate()}
      {showIfEdited()}
    </div>
  );
};

CommentInfo.propTypes = {
  showEdit: PropTypes.bool,
  edited: PropTypes.bool,
  comment: PropTypes.shape({}),
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  setReplyShowing: PropTypes.func,
  spam: PropTypes.bool,
  collapsed: PropTypes.bool,
};
