import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

class CommentMenu extends Component {
 // ({ showing, menuOptions }) => {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  buildCommentList() {
    const { menuOptions } = this.props;
    const keys = Object.keys(menuOptions);
    return keys.map((key) => {
      if (menuOptions[key].enabled) {
        return (
          <li key={key}>
            <a className="" href="#d">
              <em>{menuOptions[key].content}</em>
            </a>
          </li>
        );
      }
      return '';
    });
  }

  render() {
    const { showing } = this.props;

    return (
      <div className={`comment-menu ${(showing) ? '' : 'hidden'}`}>
        <div className="menu dropdown">
          <button className="comment-menu-dropdown pull-right dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="down-arrow-wide" />
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="comment-menu-dropdown">
            <ul role="menu">
              {this.buildCommentList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

CommentMenu.propTypes = {
  menuOptions: PropTypes.shape({}),
  showing: PropTypes.bool,
};

export default connect(null, actions)(CommentMenu);
