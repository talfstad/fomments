import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Comment from './comment';

const CommentList = props =>
  <div className="comment-list">
    {props.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
  </div>;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  comments: state.comments.list,
});

export default connect(mapStateToProps)(CommentList);
