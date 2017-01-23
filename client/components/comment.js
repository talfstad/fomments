import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import CommentMenu from './comment-menu';
import ReplyList from './reply-list';
import { DeleteCommentModal, ReportCommentModal, CommentInfo, CommentText, ProfilePic } from './shared-components';

class Comment extends Component {

  constructor(props) {
    super(props);
    const { comment, setReplyShowing } = props;
    this.state = {
      replyShowing: false,
      setReplyShowing:
        setReplyShowing || (showing => this.setReplyShowing(showing)),
      collapsed: false,
      truncated: (comment.content.length > 600),
      showing: false,
      menuOptions: comment.options,
      offsetY: 0, // used to place modal where dropdown was selected
      showReportCommentModal: false,
      showDeleteCommentModal: false,
    };
  }

  setCollapsed(collapsed) {
    this.setState({
      collapsed,
      menuOptions: {
        ...this.state.menuOptions,
        collapse: {
          ...this.state.menuOptions.collapse,
          enabled: !collapsed,
        },
        spam: {
          ...this.state.menuOptions.spam,
          enabled: !collapsed,
        },
      },
    });
  }

  setSpam(spam) {
    const { comment, updateComment, updateReply } = this.props;
    const { id, parentId } = comment;
    this.setCollapsed(spam);

    if (parentId) {
      updateReply({
        id,
        parentId,
        updates: { spam },
      });
    } else {
      updateComment({
        id,
        updates: { spam },
      });
    }
  }

  setReplyShowing(showing) {
    this.setState({ replyShowing: showing });
  }

  setTruncated(truncated) {
    this.setState({ truncated });
  }

  showReportCommentModal(showReportCommentModal) {
    const offsetY = $(this.el).offset().top;
    this.setState({ showReportCommentModal, offsetY });
  }

  showDeleteCommentModal(showDeleteCommentModal) {
    const offsetY = $(this.el).offset().top;
    this.setState({ showDeleteCommentModal, offsetY });
  }

  handleShowOptionsMenu(show) {
    if (show) {
      this.setState({ showing: true });
    } else {
      this.setState({ showing: false });
    }
  }

  handleDeleteComment() {
    const { comment, deleteReply, deleteComment } = this.props;
    const { parentId } = comment;

    if (parentId) {
      deleteReply(comment);
    } else {
      deleteComment(comment);
    }
  }

  render() {
    const { comment } = this.props;
    const { collapsed } = this.state;

    // if marked spam leave rendered until next page load
    if (!collapsed && comment.spam) return null;

    return (
      <div ref={(c) => { this.el = c; }}>
        <div onMouseEnter={() => this.handleShowOptionsMenu(true)} onMouseLeave={() => this.handleShowOptionsMenu(false)} className="row comment-row">
          <CommentMenu
            showing={this.state.showing}
            setCollapsed={collapse => this.setCollapsed(collapse)}
            showReportCommentModal={show => this.showReportCommentModal(show)}
            showDeleteCommentModal={show => this.showDeleteCommentModal(show)}
            setSpam={spam => this.setSpam(spam)}
            menuOptions={this.state.menuOptions}
          />
          <ProfilePic user={comment.user} />
          <div className="comment-detail">
            <CommentText
              {...this.props}
              collapsed={this.state.collapsed}
              truncated={this.state.truncated}
              setTruncated={truncate => this.setTruncated(truncate)}
              setCollapsed={collapse => this.setCollapsed(collapse)}
              setSpam={spam => this.setSpam(spam)}
              spam={comment.spam}
            />
            <CommentInfo
              {...this.props}
              collapsed={this.state.collapsed}
              spam={comment.spam}
              setReplyShowing={this.state.setReplyShowing}
              reply={this.state.reply}
            />
          </div>
          <ReplyList
            collapsed={this.state.collapsed}
            setReplyShowing={this.state.setReplyShowing}
            replyShowing={this.state.replyShowing}
            replies={comment.replies}
            parentId={comment.id}
          />
        </div>
        <ReportCommentModal
          marginTop={this.state.offsetY}
          show={this.state.showReportCommentModal}
          handleDeleteComment={() => this.handleDeleteComment()}
          showReportCommentModal={show => this.showReportCommentModal(show)}
        />
        <DeleteCommentModal
          marginTop={this.state.offsetY}
          show={this.state.showDeleteCommentModal}
          handleDeleteComment={() => this.handleDeleteComment()}
          showDeleteCommentModal={show => this.showDeleteCommentModal(show)}
        />
      </div>
    );
  }
}

Comment.propTypes = {
  updateComment: PropTypes.func,
  updateReply: PropTypes.func,
  deleteReply: PropTypes.func,
  deleteComment: PropTypes.func,
  setReplyShowing: PropTypes.func,
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    replies: PropTypes.object,
  }),
};

export default connect(null, actions)(Comment);
