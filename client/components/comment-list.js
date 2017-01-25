import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { sortComments } from './shared-components';
import Comment from './comment';

const CommentList = props =>
  <div className="comment-list">
    {props.comments.map(comment =>
      <Comment
        key={comment.id}
        comment={comment}
        defaultRepliesToShow={props.defaultRepliesToShow}
        defaultRepliesToLoadAtOnce={props.defaultRepliesToLoadAtOnce}
      />)}
  </div>;

CommentList.propTypes = {
  defaultRepliesToLoadAtOnce: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  defaultRepliesToShow: state.comments.defaultRepliesToShow,
  defaultRepliesToLoadAtOnce: state.comments.defaultRepliesToLoadAtOnce,
  comments: sortComments(state.comments),
});

export default connect(mapStateToProps)(CommentList);
