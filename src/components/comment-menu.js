import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';

import * as commentActions from '../actions/comments';

class CommentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tooltip: false,
    };
  }

  componentDidMount() {
    $(this.dropdown).on('show.bs.dropdown', () => {
      this.setState({ open: true });
    });
    $(this.dropdown).on('hide.bs.dropdown', () => this.setState({ open: false }));
  }

  componentWillUnmount() {
    $(this.dropdown).off();
  }

  handleSelectMenuOption(e, key) {
    e.preventDefault();
    const {
      setCollapsed,
      showReportCommentModal,
      showDeleteCommentModal,
      showEditComment,
      setSpam,
    } = this.props;

    switch (key) {
      case 'spam': {
        setSpam(true);
        break;
      }
      case 'collapse': {
        if (key === 'collapse') setCollapsed(true);
        break;
      }
      case 'report': {
        showReportCommentModal(true);
        break;
      }
      case 'delete': {
        showDeleteCommentModal(true);
        break;
      }
      case 'edit': {
        showEditComment(true);
        break;
      }
      default:
        break;
    }
  }

  buildCommentList() {
    const { menuOptions } = this.props;
    const keys = Object.keys(menuOptions);
    return keys.map((key) => {
      if (menuOptions[key].enabled) {
        return (
          <li key={key}>
            <a onClick={e => this.handleSelectMenuOption(e, key)} className="" href="#d">
              <em>{menuOptions[key].content}</em>
            </a>
          </li>
        );
      }
      return '';
    });
  }

  showTooltip() {
    this.setState({ tooltip: true });
  }

  hideTooltip() {
    this.setState({ tooltip: false });
  }

  render() {
    const { showing } = this.props;
    const { open, tooltip } = this.state;

    return (
      <div className={`comment-menu ${(showing || open) ? '' : 'hidden'}`}>
        <div ref={(c) => { this.dropdown = c; }} className="menu dropdown">
          <div className={`comment-menu-tooltip ${(tooltip) ? '' : 'hidden'}`}>
            <div className="outer">
              <div className="tooltip-text">
                <span>Menu</span>
              </div>
              <i className="arrow" />
            </div>
          </div>
          <button onMouseEnter={() => this.showTooltip()} onMouseLeave={() => this.hideTooltip()} className="comment-menu-dropdown pull-right dropdown-toggle" type="button" data-toggle="dropdown">
            <i className="down-arrow-wide" />
          </button>
          <div className="dropdown-menu dropdown-menu-right">
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
  setCollapsed: PropTypes.func,
  showEditComment: PropTypes.func,
  showDeleteCommentModal: PropTypes.func,
  showReportCommentModal: PropTypes.func,
  setSpam: PropTypes.func,
  menuOptions: PropTypes.shape({}),
  showing: PropTypes.bool,
};

export default connect(null, commentActions)(CommentMenu);
