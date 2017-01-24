import React, { PropTypes } from 'react';
import Comment from './comment';
import AddReply from './add-reply';
import ShowMoreReplies from './show-more-replies';
import { sortComments } from './shared-components';

const ReplyList = (props) => {
  const {
    collapsed,
    setReplyShowing,
    replyShowing,
    replies,
    parentId,
  } = props;

  if (!replies) return null;
  const sortedReplies = sortComments({
    list: replies,
    sortBy: {
      oldest: true,
    },
  });

  const buildReplyList = () =>
    Object.keys(sortedReplies)
      .map(key =>
        <Comment
          key={key}
          setReplyShowing={setReplyShowing}
          comment={sortedReplies[key]}
        />);

  if (collapsed) return null;
  return (
    <div className="replies">
      {buildReplyList()}
      <ShowMoreReplies />
      <AddReply setReplyShowing={setReplyShowing} replyShowing={replyShowing} parentId={parentId} />
    </div>
  );
};

ReplyList.propTypes = {
  replies: PropTypes.shape({}),
  parentId: PropTypes.number,
  collapsed: PropTypes.bool,
  replyShowing: PropTypes.bool,
  setReplyShowing: PropTypes.func,
};

export default ReplyList;
