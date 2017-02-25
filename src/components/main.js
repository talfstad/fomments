import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';
import * as actions from '../actions';

class Main extends Component {
  componentWillMount() {
    const { loadFromParent } = this.props;
    loadFromParent();
  }

  // liveUpdateHeight() {
  //   const updateHeight = () => {
  //     if (this.el) {
  //       const height = jQuery(this.el).outerHeight(true);
  //       if (height !== this.oldHeight) {
  //         this.oldHeight = height;
  //         window.parent.postMessage(['setFommentsIframeHeight', height], '*');
  //       }
  //     }
  //   };
  //   updateHeight();
  // }

  render() {
    require('../style/main.css');

    return (
      <div ref={(c) => { this.el = c; }} className="container-fluid fomments-container">
        <div className="comment-container">
          <Header />
          <CommentList />
          <CreditLink />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  loadFromParent: PropTypes.func,
};

export default connect(null, actions)(Main);
