import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddComment from './add-comment';
import Comment from './comment';
import { sortComments } from './shared-components';
import CommentPaging from './comment-paging';

import * as actions from '../actions/index';

class CommentList extends Component {
  constructor(props) {
    super(props);
    const {
      comments,
      defaultCommentsToShow,
    } = this.props;

    let showing = defaultCommentsToShow;
    let total = 0;
    if (comments) {
      showing = defaultCommentsToShow > Object.keys(comments).length ?
        Object.keys(comments).length : defaultCommentsToShow;
      total = Object.keys(comments).length;
    }

    this.state = {
      showing,
      total,
    };
  }

  handleShowMoreComments() {
    const { defaultCommentsToLoadAtOnce } = this.props;
    const { showing, total } = this.state;
    const newShowing = showing + defaultCommentsToLoadAtOnce;
    if (newShowing > total) {
      this.setState({ showing: total });
    } else {
      this.setState({ showing: newShowing });
    }
  }

  incrementComments() {
    this.setState({
      showing: this.state.showing + 1,
      total: this.state.total + 1,
    });
  }

  pageComments(sortedCommentList) {
    const { defaultCommentsToShow } = this.props;
    const { showing } = this.state;

    // test if showing less than default show
    // if is then dont slice it
    if (showing < defaultCommentsToShow) {
      return sortedCommentList;
    }
    return sortedCommentList.slice(0, this.state.showing);
  }

  buildCommentList() {
    const { user, defaultRepliesToShow, defaultRepliesToLoadAtOnce } = this.props;

    return this.pageComments(this.props.comments.map(comment =>
      <Comment
        key={comment.id}
        user={user}
        comment={comment}
        defaultRepliesToShow={defaultRepliesToShow}
        defaultRepliesToLoadAtOnce={defaultRepliesToLoadAtOnce}
      />));
  }

  render() {
    const {
      defaultCommentsToShow,
      defaultCommentsToLoadAtOnce,
    } = this.props;

    return (
      <div className="comment-list">
        <AddComment
          incrementComments={() => this.incrementComments()}
        />
        {this.buildCommentList()}
        <CommentPaging
          showing={this.state.showing}
          total={this.state.total}
          handleShowMoreComments={() => this.handleShowMoreComments()}
          defaultCommentsToShow={defaultCommentsToShow}
          defaultCommentsToLoadAtOnce={defaultCommentsToLoadAtOnce}
        />
      </div>
    );
  }
}


CommentList.propTypes = {
  defaultCommentsToLoadAtOnce: PropTypes.number,
  defaultCommentsToShow: PropTypes.number,
  defaultRepliesToShow: PropTypes.number,
  defaultRepliesToLoadAtOnce: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  defaultCommentsToShow: state.comments.defaultCommentsToShow,
  defaultCommentsToLoadAtOnce: state.comments.defaultCommentsToLoadAtOnce,
  defaultRepliesToShow: state.comments.defaultRepliesToShow,
  defaultRepliesToLoadAtOnce: state.comments.defaultRepliesToLoadAtOnce,
  user: state.comments.user,
  comments: sortComments(state.comments),
});

export default connect(mapStateToProps, actions)(CommentList);
