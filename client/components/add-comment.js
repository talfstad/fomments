import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

class AddComment extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      editing: false,
    };
  }

  handleContentChange(e) {
    const content = e.currentTarget.value;
    this.setState({ content });
  }

  buildCommentBox() {
    const { content } = this.state;

    const initialState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea onFocus={() => this.setState({ editing: true })} type="text" placeholder="Add a comment..." />
        </div>
      </div>;

    const editingState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea onChange={e => this.handleContentChange(e)} value={content} className="active" type="text" placeholder="Add a comment..." />
        </div>
        <div className="row">
          <div className="post clearfix">
            <button className="add-comment pull-right" disabled={content.length > 0 ? '' : true}><em>Post</em></button>
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
          <a href="#profilelink">
            <img src={user.image} alt="" />
          </a>
        </div>
        {this.buildCommentBox()}
      </div>
    );
  }
}

AddComment.propTypes = {
  user: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  user: state.comments.user,
});

export default connect(mapStateToProps, actions)(AddComment);
