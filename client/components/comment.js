import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import CommentMenu from './comment-menu';

class Comment extends Component {

  static buildProfilePic({ user }) {
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
  }

  constructor(props) {
    super(props);

    const options = {
      collapsed: false,
      truncated: false,
    };

    if (props.comment.content.length > 600) {
      options.truncated = true;
    }

    this.state = {
      ...options,
      showing: false,
    };
  }

  buildCommentText({ content, user }) {
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
      if (this.state.truncated) {
        const truncatedContent = content.substring(0, 600);
        return (
          <span>
            {truncatedContent}
            <span className="see-more">... <span> <a onClick={() => this.setState({ truncated: false })} href="#see-more">See More</a></span></span>
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
  }

  buildCommentInfo(comment) {
    const { likes, date } = comment;
    const { addLike, removeLike } = this.props;

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
  }

  handleShowOptionsMenu(show) {
    if (show) {
      this.setState({ showing: true });
    } else {
      this.setState({ showing: false });
    }
  }

  render() {
    const { comment } = this.props;

    return (
      <div>
        <div onMouseEnter={() => this.handleShowOptionsMenu(true)} onMouseLeave={() => this.handleShowOptionsMenu(false)} className="row comment-row">
          <CommentMenu showing={this.state.showing} menuOptions={comment.options} />
          {Comment.buildProfilePic(comment)}
          <div className="comment-detail">
            {this.buildCommentText(comment)}
            {this.buildCommentInfo(comment)}
          </div>
          {/* <ReplyList /> */}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
  }),
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
};

export default connect(null, actions)(Comment);
