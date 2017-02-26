import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GetDefaultReplyState } from '../defaults';

import * as commentActions from '../actions/comments';

class AddReply extends Component {

  constructor(props) {
    const { user, parentId } = props;
    super(props);
    this.state = GetDefaultReplyState({ user, parentId });
  }

  handleContentChange(e) {
    e.preventDefault();
    const content = e.currentTarget.value;

    this.textarea.style.height = '1px';
    this.textarea.style.height = `${25 + this.textarea.scrollHeight}px`;

    this.setState({ content });
  }

  handleSubmitReply(e) {
    e.preventDefault();
    const {
      incrementReplies,
      setReplyShowing,
      addReply,
      user,
      parentId } = this.props;

    addReply(this.state);
    setReplyShowing(false);
    this.setState(GetDefaultReplyState({ user, parentId }));
    incrementReplies();
  }

  handleCancelReply(e) {
    e.preventDefault();
    const { setReplyShowing } = this.props;
    this.setState({ content: '' });
    setReplyShowing(false);
  }

  buildReplyBox() {
    const { content } = this.state;

    return (
      <div className="add-comment reply">
        <div className="row">
          <textarea autoFocus ref={(c) => { this.textarea = c; }} onChange={e => this.handleContentChange(e)} value={content} className="active" type="text" placeholder="Add a reply..." />
        </div>
        <div className="row">
          <div className="post clearfix">
            <button className="add-comment pull-right" onClick={e => this.handleSubmitReply(e)} disabled={content.length > 0 ? '' : true}><em>Reply</em></button>
            <button className="cancel-comment mr5 pull-right" onClick={e => this.handleCancelReply(e)}><em>Cancel</em></button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { replyShowing, user } = this.props;
    if (replyShowing) {
      return (
        <div className="row comment-row">
          <div className="profile-pic">
            <img src={user.image} alt="" />
          </div>
          {this.buildReplyBox()}
        </div>
      );
    }
    return <noscript />;
  }
}

AddReply.propTypes = {
  incrementReplies: PropTypes.func,
  setReplyShowing: PropTypes.func,
  replyShowing: PropTypes.bool,
  user: PropTypes.shape({}),
  addReply: PropTypes.func,
  parentId: PropTypes.number,
};

const mapStateToProps = state => ({
  user: state.comments.user,
});

export default connect(mapStateToProps, commentActions)(AddReply);
