import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import CommentMenu from './comment-menu';
import ReplyList from './reply-list';
import { CommentInfo, CommentText, ProfilePic } from './shared-components';

class Comment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      replyShowing: false,
      setReplyShowing:
        props.setReplyShowing ?
          props.setReplyShowing :
            showing => this.setReplyShowing(showing),
      collapsed: false,
      truncated: (props.comment.content.length > 600),
      showing: false,
    };
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
          <CommentMenu showing={this.state.showing} menuOptions={comment.options} />
          <ProfilePic user={comment.user} />
          <div className="comment-detail">
            <CommentText
              {...this.props}
              truncated={this.state.truncated}
              setTruncated={truncated => this.setTruncated(truncated)}
            />
            <CommentInfo
              {...this.props}
              setReplyShowing={this.state.setReplyShowing}
              reply={this.state.reply}
            />
          </div>
          <ReplyList
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
  setReplyShowing: PropTypes.func,
  comment: PropTypes.shape({
    content: PropTypes.string,
    replies: PropTypes.object,
  }),
};

export default connect(null, actions)(Comment);
