import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import CommentMenu from './comment-menu';

class Comment extends Component {

  static buildProfilePic({ user }) {
    return (
      <div className="profile-pic">
        <a target="_blank" rel="noopener noreferrer" href={user.url}>
          <img src={user.image} alt="" />
        </a>
      </div>
    );
  }

  static buildCommentText({ content, user }) {
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

    return (
      <div className="row">
        <div className="user-info">
          <a className="name" target="_blank" rel="noopener noreferrer" href={user.url}>{user.name}</a>
          {buildAffiliation()}
        </div>
        <div className="comment-text">
          {content}
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
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
            {Comment.buildCommentText(comment)}
            {this.buildCommentInfo(comment)}
          </div>
          {/* <ReplyList /> */}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({}),
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
};

export default connect(null, actions)(Comment);
