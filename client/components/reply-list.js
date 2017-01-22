import React, { PropTypes } from 'react';
import Comment from './comment';
import AddReply from './add-reply';
import ShowMoreReplies from './show-more-replies';

const ReplyList = ({ replies, parentId }) => {
  if (!replies) return null;

  const buildReplyList = () =>
    Object.keys(replies)
      .map(key => <Comment key={key} comment={replies[key]} />);

  return (
    <div className="replies">
      {buildReplyList()}
      <ShowMoreReplies />
      <AddReply parentId={parentId} />
    </div>
  );
};

ReplyList.propTypes = {
  replies: PropTypes.shape({}),
  parentId: PropTypes.number,
};

export default ReplyList;
