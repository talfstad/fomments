import React, { PropTypes } from 'react';

const ShowMoreReplies = (props) => {
  const { showing, total, defaultRepliesToLoadAtOnce } = props;

  const handleShowMoreReplies = (e) => {
    e.preventDefault();
    props.handleShowMoreReplies();
  };

  if (showing === total) return null;

  const willLoadCount = showing + defaultRepliesToLoadAtOnce;
  const toLoadText = (willLoadCount > total) ? total - showing : willLoadCount;
  return (
    <div className="show-more-replies">
      <a onClick={e => handleShowMoreReplies(e)} href="#show-more-replies"><em>Show {toLoadText} more {`${toLoadText === 1 ? 'reply' : 'replies'}`} in this thread</em><i className="more-replies-arrow" /></a>
    </div>
  );
};

ShowMoreReplies.propTypes = {
  showing: PropTypes.number,
  total: PropTypes.number,
  defaultRepliesToLoadAtOnce: PropTypes.number,
};

export default ShowMoreReplies;
