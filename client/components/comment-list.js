import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Comment from './comment';

const CommentList = props =>
  <div className="comment-list">
    {props.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
  </div>;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(React.PropTypes.object),
};

const sortComments = (comments) => {
  const { list, sortBy } = comments;
  const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);

  switch (sortByKey) {
    case 'newest': {
      return Object.keys(list)
        .sort((a, b) => list[b].date - list[a].date)
        .map(key => list[key]);
    }
    case 'oldest': {
      return Object.keys(list)
        .sort((a, b) => list[a].date - list[b].date)
        .map(key => list[key]);
    }
    default: {
      // default to top
      return Object.keys(list)
        .sort((a, b) => list[b].likes - list[a].likes)
        .map(key => list[key]);
    }
  }
};

const mapStateToProps = state => ({
  comments: sortComments(state.comments),
});

export default connect(mapStateToProps)(CommentList);
