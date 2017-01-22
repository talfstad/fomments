import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ProfilePic, CommentInfo, CommentText } from './shared-components';
import * as actions from '../actions/index';

class Reply extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      truncated: (props.comment.content.length > 600),
      showing: false,
    };
  }

  setTruncated(truncated) {
    this.setState({ truncated });
  }

  render() {
    const { comment } = this.props;

    return (
      <div className="row comment-row">
        <div className="comment-menu">
          <div className="menu dropdown">
            <button className="comment-menu-dropdown pull-right dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="down-arrow-wide" />
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="comment-menu-dropdown">
              <ul role="menu">
                <li>
                  <a href="#f"><em>Collapse comment</em></a>
                </li>
                <li>
                  <a className="" href="#d"><em>Mark as spam</em></a>
                </li>
                <li>
                  <a className="" href="#f"><em>Report</em></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ProfilePic user={comment.user} />
        <div className="comment-detail">
          <CommentText
            {...this.props}
            truncated={this.state.truncated}
            setTruncated={truncated => this.setTruncated(truncated)}
          />
          <CommentInfo {...this.props} />
        </div>
      </div>
    );
  }
}

Reply.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    length: PropTypes.number,
  }),
};

export default connect(null, actions)(Reply);
