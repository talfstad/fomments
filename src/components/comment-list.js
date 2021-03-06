import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddComment from './add-comment';
import Comment from './comment';
import CommentPaging from './comment-paging';

import * as commentActions from '../actions/comments';

class CommentList extends Component {

  componentDidMount() {
    const { updateIframeHeight } = this.props;
    updateIframeHeight();
  }

  componentDidUpdate() {
    const { updateIframeHeight } = this.props;
    updateIframeHeight();
  }

  handleShowMoreComments() {
    const { showMoreComments } = this.props;
    showMoreComments();
  }

  buildCommentList() {
    const {
      pagedList,
      user,
      showMoreReplies,
      updateComment,
      updateReply,
      deleteComment,
      deleteReply,
      updateIframeHeight,
      addLike,
      removeLike,
      productName,
      generalProductName,
    } = this.props;

    let finalProductName = productName || '';

    if (finalProductName.replace(/ /g, '').length <= 0) {
      finalProductName = generalProductName;
    }

    return pagedList.map(comment =>
      <Comment
        productName={finalProductName}
        updateIframeHeight={updateIframeHeight}
        showMoreReplies={showMoreReplies}
        updateComment={updateComment}
        updateReply={updateReply}
        deleteComment={deleteComment}
        deleteReply={deleteReply}
        addLike={addLike}
        removeLike={removeLike}
        key={comment.id}
        user={user}
        comment={comment}
      />);
  }

  render() {
    const {
      updateIframeHeight,
      nextCountToLoad,
    } = this.props;
    return (
      <div className="comment-list">
        <AddComment updateIframeHeight={() => updateIframeHeight()} />
        {this.buildCommentList()}
        <CommentPaging
          nextCountToLoad={nextCountToLoad}
          handleShowMoreComments={() => this.handleShowMoreComments()}
        />
      </div>
    );
  }
}

CommentList.propTypes = {
  productName: PropTypes.string,
  generalProductName: PropTypes.string,
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  deleteComment: PropTypes.func,
  deleteReply: PropTypes.func,
  updateReply: PropTypes.func,
  updateComment: PropTypes.func,
  showMoreReplies: PropTypes.func,
  showMoreComments: PropTypes.func,
  pagedList: PropTypes.arrayOf(PropTypes.object),
  nextCountToLoad: PropTypes.number,
  updateIframeHeight: PropTypes.func,
  user: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  productName: state.sectionInfo.productName,
  generalProductName: state.sectionInfo.generalProductName,
  pagedList: state.commentPager.pagedList,
  nextCountToLoad: state.commentPager.nextCountToLoad,
  user: state.user,
});

export default connect(mapStateToProps, commentActions)(CommentList);
