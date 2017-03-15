import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  EXTERNAL_MESSAGE_NAMESPACE,
  EXTERNAL_RESPONSE_NAMESPACE,
  GENERAL_PRODUCT_NAME,
} from '../config';

import {
  LOAD_FOMMENT_SECTION,
  SET_FOMMENT_SECTION_PRODUCT_NAME,
} from '../actions/types';

import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';
import * as mainActions from '../actions/main';

class Main extends Component {
  componentWillMount() {
    const { loadFromParent } = this.props;
    loadFromParent();
    this.listenForExternalMessages();
  }

  componentDidMount() {
    // Initial load needs some time to render ... sketchy fix
    setTimeout(() => this.updateIframeHeight(), 500);
  }

  listenForExternalMessages() {
    const {
      loadFommentSection,
      setFommentProductName,
    } = this.props;

    // Listen for external events to come in and trigger action based on what comes in
    const onReceiveExternalMessage = ({ data }) => {
      const [namespace, action] = data;

      const sendReceivedConfirmation = () => {
        const response = {
          [EXTERNAL_RESPONSE_NAMESPACE]: true,
        };
        window.parent.postMessage([EXTERNAL_RESPONSE_NAMESPACE, response], '*');
      };

      if (namespace === EXTERNAL_MESSAGE_NAMESPACE) {
        const { type } = action;
        switch (type) {
          case LOAD_FOMMENT_SECTION: {
            const { sectionId, productName } = action;
            loadFommentSection({ sectionId, productName });
            break;
          }
          case SET_FOMMENT_SECTION_PRODUCT_NAME: {
            const { productName } = action;
            if (productName.replace(/ /g, '').length > 0) {
              setFommentProductName(productName);
            } else {
              setFommentProductName(GENERAL_PRODUCT_NAME);
            }
            break;
          }
          default:
            break;
        }
        return sendReceivedConfirmation();
      }
      return false;
    };
    window.addEventListener('message', onReceiveExternalMessage);
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
  setFommentProductName: PropTypes.func,
  loadFommentSection: PropTypes.func,
  loadFromParent: PropTypes.func,
  updateIframeHeight: PropTypes.func,
};

export default connect(null, mainActions)(Main);
