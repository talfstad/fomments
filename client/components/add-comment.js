import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
  }

  getDefaultState(props = this.props) {
    return {
      id: Math.floor(Math.random() * 1000),
      user: props.user,
      content: '',
      options: {
        collapse: true,
        spam: true,
        report: true,
        edit: false,
        delete: false,
      },
      likes: 586,
      date: 'Nov 20, 2016 7:57pm',
      status: {
        report: false,
        spam: false,
      },
      reply: {
        editing: false,
        content: '',
      },
      state: {
        showing: true,
        editing: false,
        collapsed: false,
        truncated: true,
      },
      replies: [],
    };
  }

  handleContentChange(e) {
    e.preventDefault();
    const content = e.currentTarget.value;
    this.setState({ content });
  }

  handleSubmitComment(e) {
    e.preventDefault();
    const { addComment } = this.props;
    addComment(this.state);
    this.setState(this.getDefaultState());
  }

  buildCommentBox() {
    const { content } = this.state;

    const initialState = () =>
      <div className="add-comment">
        <div className="row">
          <textarea value={content} onFocus={() => this.setState({ state: { editing: true } })} type="text" placeholder="Add a comment..." />
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

    if (this.state.state.editing) {
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
  addComment: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.comments.user,
});

export default connect(mapStateToProps, actions)(AddComment);
