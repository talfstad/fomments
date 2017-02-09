import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Main from './main';
import INITIAL_STATE from '../initial-state';
import * as actions from '../actions/index';

class App extends Component {
  componentWillMount() {
    // load up the data
    const { loadLocalStorageState } = this.props;
    if (localStorage) {
      const storedComments = localStorage.getItem('fomments');
      // localStorage keeps things as strings so test string undefined
      if (storedComments) {
        loadLocalStorageState(JSON.parse(storedComments));
      } else {
        localStorage.setItem('fomments', JSON.stringify(INITIAL_STATE.list));
      }
    }
  }

  registerParentEvents() {
    // add window listener to update iframe height
    window.addEventListener('message', (e) => {
      const iframeId = e.data[1];
      const iframe = jQuery(`#${iframeId}`);
      const eventName = e.data[0];
      const height = e.data[2];
      switch (eventName) {
        case 'setFommentsIframeHeight':
          if (`${height}px` !== iframe.css('height')) {
            iframe.css('height', `${height}px`);
          }
          break;
        default:
          break;
      }
    }, false);
  }

  liveUpdateHeight() {
    const updateHeight = () => {
      setTimeout(() => {
        if (this.el) {
          const height = jQuery(this.el).outerHeight(true);
          window.parent.postMessage(['setFommentsIframeHeight', window.frameElement.getAttribute('id'), height], '*');
          updateHeight();
        }
      }, 100);
    };

    updateHeight();
  }

  setEl(el) {
    this.el = el;
  }

  render() {
    // if we're in an iframe render just the app, if not render the iframe with the src
    if (window.self !== window.top) {
      // inside iframe render app
      this.liveUpdateHeight();
      return (
        <Main setEl={el => this.setEl(el)} />
      );
    }

    this.registerParentEvents();
    // not in iframe so show iframe with src
    // TODO: dynamically update ID based on url
    return (
      <iframe
        id="fomments-ski3001nch"
        width="100%"
        frameBorder="0"
        src="/index.html"
      />
    );
  }
}

App.propTypes = {
  loadLocalStorageState: PropTypes.func,
};

export default connect(null, actions)(App);
