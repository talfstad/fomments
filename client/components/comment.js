import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import CommentMenu from './comment-menu';
import ReplyList from './reply-list';
import { CommentInfo, CommentText, ProfilePic } from './shared-components';

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
          <CommentMenu
            showing={this.state.showing}
            setCollapsed={collapsed => this.setCollapsed(collapsed)}
            setSpam={spam => this.setSpam(spam)}
            menuOptions={this.state.menuOptions}
          />
          <ProfilePic user={comment.user} />
          <div className="comment-detail">
            <CommentText
              {...this.props}
              collapsed={this.state.collapsed}
              truncated={this.state.truncated}
              setTruncated={truncated => this.setTruncated(truncated)}
              setCollapsed={collapsed => this.setCollapsed(collapsed)}
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
      </div>
    );
  }
}

Comment.propTypes = {
  spam: PropTypes.bool,
  updateComment: PropTypes.func,
  updateReply: PropTypes.func,
  setReplyShowing: PropTypes.func,
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    replies: PropTypes.object,
  }),
};

export default connect(null, actions)(Comment);
