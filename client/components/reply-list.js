import React, { Component, PropTypes } from 'react';
import Comment from './comment';
import AddReply from './add-reply';
import ReplyPaging from './reply-paging';
import { sortComments } from './shared-components';

class ReplyList extends Component {
  constructor(props) {
    super(props);

    const {
      replies,
      defaultRepliesToShow,
    } = this.props;

    let showing = 0;
    let total = 0;
    if (replies) {
      showing = defaultRepliesToShow > Object.keys(replies).length ?
        Object.keys(replies).length : defaultRepliesToShow;
      total = Object.keys(replies).length;
    }

    this.state = {
      showing,
      total,
    };
  }

  handleShowMoreReplies() {
    const { defaultRepliesToLoadAtOnce } = this.props;
    const { showing, total } = this.state;

    const newShowing = showing + defaultRepliesToLoadAtOnce;
    if (newShowing > total) {
      this.setState({ showing: total });
    } else {
      this.setState({ showing: newShowing });
    }
  }

  incrementReplies() {
    this.setState({
      showing: this.state.showing + 1,
      total: this.state.total + 1,
    });
  }

  buildReplyList() {
    const {
      setReplyShowing,
      replies,
      collapsed,
    } = this.props;

    if (!replies || collapsed) return null;

    const sortedReplies = sortComments({
      list: replies,
      sortBy: {
        oldest: true,
      },
    });

    const pageReplies = sortedReplyList =>
      sortedReplyList.slice(0, this.state.showing);

    return pageReplies(Object.keys(sortedReplies).map(key =>
      <Comment
        key={key}
        setReplyShowing={setReplyShowing}
        comment={sortedReplies[key]}
      />));
  }

  render() {
    const {
      setReplyShowing,
      replyShowing,
      parentId,
      defaultRepliesToShow,
      defaultRepliesToLoadAtOnce,
    } = this.props;

    return (
      <div className="replies">
        {this.buildReplyList()}
        <ReplyPaging
          showing={this.state.showing}
          total={this.state.total}
          handleShowMoreReplies={() => this.handleShowMoreReplies()}
          defaultRepliesToShow={defaultRepliesToShow}
          defaultRepliesToLoadAtOnce={defaultRepliesToLoadAtOnce}
        />
        <AddReply
          incrementReplies={() => this.incrementReplies()}
          setReplyShowing={setReplyShowing}
          replyShowing={replyShowing}
          parentId={parentId}
        />
      </div>
    );
  }
}

ReplyList.propTypes = {
  defaultRepliesToLoadAtOnce: PropTypes.number,
  defaultRepliesToShow: PropTypes.number,
  replies: PropTypes.shape({}),
  parentId: PropTypes.number,
  collapsed: PropTypes.bool,
  replyShowing: PropTypes.bool,
  setReplyShowing: PropTypes.func,
};

export default ReplyList;
