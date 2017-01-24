import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { sortComments } from './shared-components';
import Comment from './comment';

const CommentList = props =>
  <div className="comment-list">
    {props.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
  </div>;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = state => ({
  comments: sortComments(state.comments),
});

export default connect(mapStateToProps)(CommentList);
