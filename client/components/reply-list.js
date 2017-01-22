import React, { PropTypes } from 'react';
import Reply from './reply';
import ReplyComment from './reply-comment';
import ShowMoreReplies from './show-more-replies';

const ReplyList = ({ replies }) => {
  const buildReplyList = () =>
    Object.keys(replies)
      .map(key => <Reply key={key} reply={replies[key]} />);

  return (
    <div className="replies">
      {buildReplyList()}
      <ShowMoreReplies />
      <ReplyComment />
    </div>
  );
};

ReplyList.propTypes = {
  replies: PropTypes.shape({}),
};

export default ReplyList;
