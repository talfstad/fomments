import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as commentActions from '../actions/comments';

class CommentEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editableContent: props.content,
    };
  }

  handleSubmitEdit(e) {
    e.preventDefault();
    const { saveEditComment, showEditComment } = this.props;
    saveEditComment(this.state.editableContent);
    showEditComment(false);
  }

  handleCancelEdit(e) {
    e.preventDefault();
    const { showEditComment } = this.props;
    showEditComment(false);
  }

  handleContentChange(e) {
    this.setState({ editableContent: e.currentTarget.value });
    this.textarea.style.height = '1px';
    this.textarea.style.height = `${25 + this.textarea.scrollHeight}px`;
  }

  render() {
    const {
      showEdit,
    } = this.props;

    if (!showEdit) return <noscript />;

    return (
      <div className="add-comment reply">
        <div className="row">
          <textarea ref={(c) => { this.textarea = c; }} onChange={e => this.handleContentChange(e)} value={this.state.editableContent} autoFocus className="active" type="text" placeholder="Add a comment..." />
        </div>
        <div className="row">
          <div className="post clearfix">
            <button className="add-comment pull-right" onClick={e => this.handleSubmitEdit(e)} disabled={this.state.editableContent.length > 0 ? '' : true}><em>Save</em></button>
            <button className="cancel-comment mr5 pull-right" onClick={e => this.handleCancelEdit(e)}><em>Cancel</em></button>
          </div>
        </div>
      </div>
    );
  }
}

CommentEdit.propTypes = {
  content: PropTypes.string,
  showEdit: PropTypes.bool,
  saveEditComment: PropTypes.func,
  showEditComment: PropTypes.func,
};

export default connect(null, commentActions)(CommentEdit);
