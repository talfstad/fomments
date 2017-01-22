import React, { PropTypes } from 'react';
import Reply from './reply';
import AddReply from './add-reply';
import ShowMoreReplies from './show-more-replies';

const ReplyList = ({ replies, parentId }) => {
  const buildReplyList = () =>
    Object.keys(replies)
      .map(key => <Reply key={key} comment={replies[key]} />);

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
