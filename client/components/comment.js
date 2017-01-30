import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import CommentMenu from './comment-menu';
import CommentEdit from './comment-edit';
import ReplyList from './reply-list';
import {
  DeleteCommentModal,
  ReportCommentModal,
  CommentInfo,
  CommentText,
  ProfilePic } from './shared-components';

class Comment extends Component {

  constructor(props) {
    super(props);
    const {
      comment,
      setReplyShowing,
      defaultRepliesToLoadAtOnce,
      defaultRepliesToShow,
    } = props;

    this.state = {
      defaultRepliesToShow,
      defaultRepliesToLoadAtOnce,
      replyShowing: false,
      setReplyShowing:
        setReplyShowing || (showing => this.setReplyShowing(showing)),
      collapsed: false,
      truncated: (comment.content.length > 600),
      showing: false, // this is for menu options
      menuOptions: comment.options,
      offsetY: 0, // used to place modal where dropdown was selected
      showReportCommentModal: false,
      showDeleteCommentModal: false,
      showEdit: false,
    };
  }

  setCollapsed(collapsed) {
    const { parentId } = this.props.comment;

    if (parentId) {
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
    } else {
      const userId = this.props.user.id;
      const commentUserId = this.props.comment.user.id;

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
            enabled: (!collapsed && userId !== commentUserId),
          },
        },
      });
    }
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
    this.showDeleteCommentModal(false);
    this.showReportCommentModal(false);
  }

  showEditComment(show) {
    this.setState({ showEdit: show });
  }

  saveEditComment(content) {
    const { updateComment, updateReply, comment } = this.props;
    if (comment.parentId) {
      updateReply({
        parentId: comment.parentId,
        id: comment.id,
        save: true,
        updates: { content },
      });
    } else {
      updateComment({ id: comment.id, save: true, updates: { content } });
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
            showEdit={this.state.showEdit}
            showEditComment={show => this.showEditComment(show)}
            setSpam={spam => this.setSpam(spam)}
            menuOptions={this.state.menuOptions}
          />
          <ProfilePic user={comment.user} />
          <div className="comment-detail">
            <CommentText
              {...this.props}
              collapsed={this.state.collapsed}
              showEdit={this.state.showEdit}
              truncated={this.state.truncated}
              setTruncated={truncate => this.setTruncated(truncate)}
              setCollapsed={collapse => this.setCollapsed(collapse)}
              setSpam={spam => this.setSpam(spam)}
              spam={comment.spam}
            />
            <CommentEdit
              showEdit={this.state.showEdit}
              showEditComment={() => this.showEditComment()}
              saveEditComment={content =>
                this.saveEditComment(content)}
              content={comment.content}
            />
            <CommentInfo
              {...this.props}
              showEdit={this.state.showEdit}
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
            defaultRepliesToShow={this.state.defaultRepliesToShow}
            defaultRepliesToLoadAtOnce={this.state.defaultRepliesToLoadAtOnce}
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
  defaultRepliesToLoadAtOnce: PropTypes.number,
  defaultRepliesToShow: PropTypes.number,
  updateComment: PropTypes.func,
  updateReply: PropTypes.func,
  deleteReply: PropTypes.func,
  deleteComment: PropTypes.func,
  saveEditComment: PropTypes.func,
  setReplyShowing: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  comment: PropTypes.shape({
    id: PropTypes.number,
    parentId: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
    content: PropTypes.string,
    replies: PropTypes.object,
  }),
};

export default connect(null, actions)(Comment);
