import React, { PropTypes } from 'react';
import Comment from './comment';
import AddReply from './add-reply';
import ShowMoreReplies from './show-more-replies';

const ReplyList = ({ setReplyShowing, replyShowing, replies, parentId }) => {
  if (!replies) return null;

  const buildReplyList = () =>
    Object.keys(replies)
      .map(key =>
        <Comment
          key={key}
          setReplyShowing={setReplyShowing}
          comment={replies[key]}
        />);

  return (
    <div className="replies">
      {buildReplyList()}
      <ShowMoreReplies />
      <AddReply setReplyShowing={setReplyShowing} replyShowing={replyShowing} parentId={parentId} />
    </div>
  );
};

ReplyList.propTypes = {
  parentId: PropTypes.number,
  replies: PropTypes.shape({}),
  replyShowing: PropTypes.bool,
  setReplyShowing: PropTypes.func,
};

export default ReplyList;
