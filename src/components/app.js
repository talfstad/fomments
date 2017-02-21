import React, { Component } from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Main from './main';
import * as actions from '../actions/index';

if (window.self !== window.top) {
  require('../style/main.css');
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { sectionId: null };

    if (window.self !== window.top) {
      this.registerIframeEvents();
    } else {
      this.registerParentEvents();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('fomments');
  }

  setEl(el) {
    this.el = el;
  }

  registerParentEvents() {
    // get section ID or if none, set to default general-section
    this.sectionId = jQuery('#fomments').attr('section-id') || 'general-section';

    const registerParentEvents = () => {
      // add window listener to update iframe height
      window.addEventListener('message', (e) => {
        const eventName = e.data[0];
        switch (eventName) {
          case 'setFommentsIframeHeight': {
            const iframeId = e.data[1];
            const iframe = jQuery(`#${iframeId}`);
            const height = e.data[2];
            if (`${height}px` !== iframe.css('height')) {
              iframe.css('height', `${height}px`);
            }
            break;
          }
          case 'getSectionId': {
            jQuery('#fomments iframe')[0]
              .contentWindow.postMessage(['setSectionId', this.sectionId], '*');
            break;
          }
          default:
            break;
        }
      }, false);
    };
    registerParentEvents();
  }

  registerIframeEvents() {
    // inside iframe render app
    const registerIframeEvents = () => {
      // add window listener to update iframe height
      window.addEventListener('message', (e) => {
        const eventName = e.data[0];
        switch (eventName) {
          case 'setSectionId': {
            const sectionId = e.data[1];
            this.setState({ sectionId });
            this.liveUpdateHeight();
            break;
          }
          default:
            break;
        }
      }, false);
    };
    registerIframeEvents();

    // Iframe needs sectionId to boot up
    window.parent.postMessage(['getSectionId'], '*');
  }

  liveUpdateHeight() {
    // Saftey: Don't init multiple times
    if (this.liveUpdateHeightRunning) return;
    this.liveUpdateHeightRunning = true;

    const updateHeight = () => {
      if (this.el) {
        const height = jQuery(this.el).outerHeight(true);
        if (height !== this.oldHeight) {
          this.oldHeight = height;
          window.parent.postMessage(['setFommentsIframeHeight', this.state.sectionId, height], '*');
        }
      }
    };

    setInterval(() => {
      updateHeight();
    }, 100);
  }

  render() {
    // if we're in an iframe render just the app, if not render the iframe with the src
    if (window.self === window.top) {
      return (
        <iframe
          id={this.sectionId} // randomly generated just to get acces to el from parent
          marginHeight="50"
          width="100%"
          frameBorder="0"
          src="http://localhost:8080/index.html"
        />
      );
    } else if (this.state.sectionId) {
      // inside iframe render app
      return (
        <Main sectionId={this.state.sectionId} setEl={el => this.setEl(el)} />
      );
    }

    // Don't show anything until sectionId is set
    return <noscript />;
  }
}

export default connect(null, actions)(App);
