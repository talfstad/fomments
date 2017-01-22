import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getDefaultReplyState } from '../defaults';

import * as actions from '../actions/index';

class ReplyComment extends Component {

  constructor(props) {
    super(props);
    this.state = getDefaultReplyState(props.user);
  }

  handleContentChange(e) {
    e.preventDefault();
    const content = e.currentTarget.value;
    this.setState({ content });
  }

  handleSubmitComment(e) {
    e.preventDefault();
    const { addComment, user } = this.props;
    addComment(this.state);
    this.setState(getDefaultReplyState(user));
  }

  buildCommentBox() {
    const { content } = this.state;

    const initialState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea value={content} onFocus={() => this.setState({ editing: true })} type="text" placeholder="Add a comment..." />
        </div>
      </div>;

    const editingState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea onChange={e => this.handleContentChange(e)} value={content} className="active" type="text" placeholder="Add a comment..." />
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
    return (
      <div className="row comment-row">
        <div className="profile-pic">
          <a href="#profilelink">
            <img src="/images/noprofilepic.jpg" alt="" />
          </a>
        </div>
        <div className="add-comment reply">
          <div className="row">
            <textarea type="text" placeholder="Add a reply..." />
          </div>
          <div className="row">
            <div className="post clearfix">
              <button className="add-comment disabled pull-right"><em>Reply</em></button>
              <button className="cancel-comment mr5 pull-right"><em>Cancel</em></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReplyComment.propTypes = {
  user: PropTypes.shape({}),
  addComment: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.comments.user,
});

export default connect(mapStateToProps, actions)(ReplyComment);
