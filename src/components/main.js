import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';
import * as actions from '../actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { sectionId: null };
  }

  componentWillMount() {
    this.registerEvents();
    window.parent.postMessage(['loadFromParent'], '*');
  }

  liveUpdateHeight() {
    const updateHeight = () => {
      if (this.el) {
        const height = jQuery(this.el).outerHeight(true);
        if (height !== this.oldHeight) {
          this.oldHeight = height;
          window.parent.postMessage(['setFommentsIframeHeight', height], '*');
        }
      }
    };
    updateHeight();
  }

  registerEvents() {
    const { setIframeState } = this.props;
    // inside iframe render app
    const registerEvents = () => {
      // add window listener to update iframe height
      window.addEventListener('message', (e) => {
        const eventName = e.data[0];
        switch (eventName) {
          case 'setInitialState': {
            const state = e.data[1];
            setIframeState(state);
            break;
          }
          default:
            break;
        }
      }, false);
    };
    registerEvents();
  }

  render() {
    require('../style/main.css');

    const sectionId = this.state;

    if (sectionId) {
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

    return <noscript />;
  }
}

Main.propTypes = {
  setIframeState: PropTypes.func,
};

export default connect(null, actions)(Main);
