import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Main from './main';
import INITIAL_STATE from '../initial-state';
import * as actions from '../actions/index';

if (window.self !== window.top) {
  require('../style/main.css');
}

class App extends Component {

  constructor(props) {
    super(props);

    if (window.self !== window.top) {
      // inside iframe render app
      this.liveUpdateHeight();
    } else {
      const registerParentEvents = () => {
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
      };
      registerParentEvents();
    }
  }

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

  componentWillUnmount() {
    window.removeEventListener('fomments');
  }

  setEl(el) {
    this.el = el;
  }

  liveUpdateHeight() {
    const updateHeight = () => {
      if (this.el) {
        const height = jQuery(this.el).outerHeight(true);
        if (height !== this.oldHeight) {
          this.oldHeight = height;
          window.parent.postMessage(['setFommentsIframeHeight', '20f32f08hdsflh', height], '*');
        }
      }
    };

    setInterval(() => {
      updateHeight();
    }, 100);
  }

  render() {
    // if we're in an iframe render just the app, if not render the iframe with the src
    if (window.self !== window.top) {
      // inside iframe render app
      return (
        <Main setEl={el => this.setEl(el)} />
      );
    }

    // not in iframe so show iframe with src
    // TODO: dynamically update ID based on url
    return (
      <iframe
        id="20f32f08hdsflh" // randomly generated just to get acces to el from parent
        data-id="12fes00afsdaeaf3af3daf3"
        marginheight="50"
        data-demographic="ski3001nch"
        width="100%"
        frameBorder="0"
        src="http://localhost:8080/index.html"
      />
    );
  }
}

App.propTypes = {
  loadLocalStorageState: PropTypes.func,
};

export default connect(null, actions)(App);
