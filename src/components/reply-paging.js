import React, { PropTypes } from 'react';

const ReplyPaging = (props) => {
  const { nextCountToLoad, showMoreReplies } = props;

  const handleShowMoreReplies = (e) => {
    e.preventDefault();
    showMoreReplies();
  };

  if (nextCountToLoad < 1) return <noscript />;
  return (
    <div className="show-more-replies">
      <a onClick={handleShowMoreReplies} href="#show-more-replies">
        <em>Show {nextCountToLoad} more {`${nextCountToLoad === 1 ? 'reply' : 'replies'}`} in this thread</em>
        <i className="more-replies-arrow" />
      </a>
    </div>
  );
};

ReplyPaging.propTypes = {
  nextCountToLoad: PropTypes.number,
  showMoreReplies: PropTypes.func,
};

export default ReplyPaging;
