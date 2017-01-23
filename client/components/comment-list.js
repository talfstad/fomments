import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Comment from './comment';

const CommentList = ({ comments }) =>
  <div className="comment-list">
    {
      Object.keys(comments).map((key) => {
        const { spam, report } = comments[key];
        if (!spam && !report) {
          return <Comment key={key} comment={comments[key]} />;
        }
        return null;
      })
    }
  </div>;

CommentList.propTypes = {
  comments: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  comments: state.comments.list,
});

export default connect(mapStateToProps)(CommentList);
