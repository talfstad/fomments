import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GetDefaultCommentState } from '../defaults';

import * as commentActions from '../actions/comments';

class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = GetDefaultCommentState(props.user);
  }

  componentDidUpdate() {
    const { updateIframeHeight } = this.props;
    updateIframeHeight();
  }

  handleContentChange(e) {
    e.preventDefault();
    const content = e.currentTarget.value;

    this.textarea.style.height = '1px';
    this.textarea.style.height = `${25 + this.textarea.scrollHeight}px`;

    this.setState({ content });
  }

  handleSubmitComment(e) {
    e.preventDefault();
    const { addComment, user } = this.props;
    addComment(this.state);
    this.setState(GetDefaultCommentState(user));
  }

  buildCommentBox() {
    const { content } = this.state;

    const initialState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea style={{ height: '51px' }} value={content} onFocus={() => this.setState({ editing: true })} type="text" placeholder="Add a comment..." />
        </div>
      </div>;

    const editingState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea ref={(c) => { this.textarea = c; }} onChange={e => this.handleContentChange(e)} value={content} className="active" type="text" placeholder="Add a comment..." />
        </div>
        <div className="row">
          <div className="post clearfix">
            <button className="add-comment pull-right" onClick={e => this.handleSubmitComment(e)} disabled={content.length > 0 ? '' : true}><em>Post</em></button>
          </div>
        </div>
      </div>;

    if (this.state.editing) {
      return editingState();
    }

    return initialState();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="row comment-row">
        <div className="profile-pic">
          <img src={user.image} alt="" />
        </div>
        {this.buildCommentBox()}
      </div>
    );
  }
}

AddComment.propTypes = {
  user: PropTypes.shape({}),
  addComment: PropTypes.func,
  updateIframeHeight: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, commentActions)(AddComment);
