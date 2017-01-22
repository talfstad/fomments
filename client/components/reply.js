import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CommentInfo } from './shared-components';
import * as actions from '../actions/index';

class Reply extends Component {
  render() {
    const { comment } = this.props;

    return (
      <div className="row comment-row">
        <div className="comment-menu">
          <div className="menu dropdown">
            <button className="comment-menu-dropdown pull-right dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="down-arrow-wide" />
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="comment-menu-dropdown">
              <ul role="menu">
                <li>
                  <a href="#f"><em>Collapse comment</em></a>
                </li>
                <li>
                  <a className="" href="#d"><em>Mark as spam</em></a>
                </li>
                <li>
                  <a className="" href="#f"><em>Report</em></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-pic">
          <a href="#profilelink">
            <img src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/c0.12.48.48/p48x48/5417_10208966960280793_2802424953995387521_n.jpg?oh=ad0814b805499e5987de27f8407cf608&oe=591F107C" alt="" />
          </a>
        </div>

        <div className="comment-detail">
          <div className="row">
            <div className="user-info">
              <a className="name" href={comment.user.url}>{comment.user.name}</a>
              <span className="dot"> · </span>
              <a className="page" href={comment.user.affiliation.url}>{comment.user.affiliation.name}</a>
            </div>
            <div className="comment-text">
              {comment.content}
            </div>
          </div>
          <CommentInfo {...this.props} />
        </div>
      </div>
    );
  }
}

Reply.propTypes = {
  comment: PropTypes.shape({}),
};

export default connect(null, actions)(Reply);
