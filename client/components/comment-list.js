import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Comment from './comment';

const CommentList = props =>
  <div className="comment-list">
    {Object.keys(props.comments).map(key => <Comment key={key} comment={props.comments[key]} />)}
  </div>;

CommentList.propTypes = {
  comments: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  comments: state.comments.list,
});

export default connect(mapStateToProps)(CommentList);
