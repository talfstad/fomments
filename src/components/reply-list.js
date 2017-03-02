import React, { Component, PropTypes } from 'react';
import Comment from './comment';
import AddReply from './add-reply';
import ReplyPaging from './reply-paging';

class ReplyList extends Component {
  handleShowMoreReplies() {
    const { parentId, showMoreReplies } = this.props;
    showMoreReplies(parentId);
  }

  buildReplyList() {
    const {
      setReplyShowing,
      collapsed,
      pagedReplies,
    } = this.props;

    if (!pagedReplies || collapsed) return <noscript />;
    const { pagedList } = pagedReplies;
    return pagedList.map(reply =>
      <Comment
        key={reply.id}
        setReplyShowing={setReplyShowing}
        comment={reply}
      />);
  }

  render() {
    const {
      setReplyShowing,
      replyShowing,
      parentId,
      spam,
      pagedReplies = {
        nextCountToLoad: 0,
        pagedList: [],
      },
    } = this.props;
    const { nextCountToLoad } = pagedReplies;

    if (spam) return <noscript />;

    return (
      <div className="replies">
        {this.buildReplyList()}
        <ReplyPaging
          nextCountToLoad={nextCountToLoad}
          showMoreReplies={() => this.handleShowMoreReplies()}
        />
        <AddReply
          setReplyShowing={setReplyShowing}
          replyShowing={replyShowing}
          parentId={parentId}
        />
      </div>
    );
  }
}

ReplyList.propTypes = {
  showMoreReplies: PropTypes.func,
  pagedReplies: PropTypes.arrayOf(PropTypes.object),
  parentId: PropTypes.number,
  collapsed: PropTypes.bool,
  spam: PropTypes.bool,
  replyShowing: PropTypes.bool,
  setReplyShowing: PropTypes.func,
};

export default ReplyList;
