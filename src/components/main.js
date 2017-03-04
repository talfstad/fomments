import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';
import * as mainActions from '../actions/main';

class Main extends Component {
  componentWillMount() {
    const { loadFromParent } = this.props;
    loadFromParent();
  }

  componentDidMount() {
    // Initial load needs some time to render ... sketchy fix
    setTimeout(() => this.updateIframeHeight(), 100);
  }

  updateIframeHeight() {
    const { updateIframeHeight } = this.props;
    const height = $(this.el).outerHeight(true);
    if (height !== this.oldHeight) {
      updateIframeHeight(height);
      this.oldHeight = height;
    }
  }

  render() {
    require('../style/main.css');

    return (
      <div ref={(c) => { this.el = c; }} className="container-fluid fomments-container">
        <div className="comment-container">
          <Header />
          <CommentList updateIframeHeight={() => this.updateIframeHeight()} />
          <CreditLink />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  loadFromParent: PropTypes.func,
  updateIframeHeight: PropTypes.func,
};

export default connect(null, mainActions)(Main);
