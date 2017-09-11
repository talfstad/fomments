import _ from 'lodash';
import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  LOAD_FOMMENT_SECTION,
  SET_FOMMENT_SECTION_PRODUCT_NAME,
} from '../actions/types';

import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';
import {
  loadFromParent,
  setFommentProductName,
  updateIframeHeight,
  loadFommentSection,
} from '../actions/main';

import Config from '../config';

const {
  EXTERNAL_MESSAGE_NAMESPACE,
  EXTERNAL_RESPONSE_NAMESPACE,
} = Config(process.env.NODE_ENV);

class Main extends Component {
  componentWillMount() {
    const { loadFromParentAction } = this.props;
    loadFromParentAction();
    this.listenForExternalMessages();
  }

  componentDidMount() {
    // Initial load needs some time to render ... sketchy fix
    setTimeout(() => this.updateIframeHeight(), 500);
  }

  listenForExternalMessages() {
    const {
      loadFommentSectionAction,
      setFommentProductNameAction,
    } = this.props;

    // Listen for external events to come in and trigger action based on what comes in
    const onReceiveExternalMessage = ({ data }) => {
      // Input validation
      if (!_.isArray(data)) {
        return false;
      }
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
            loadFommentSectionAction({ sectionId, productName });
            break;
          }
          case SET_FOMMENT_SECTION_PRODUCT_NAME: {
            const { productName } = action;
            setFommentProductNameAction(productName);
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
    const { updateIframeHeightAction } = this.props;
    const height = $(this.el).outerHeight(true);
    if (height !== this.oldHeight) {
      updateIframeHeightAction(height);
      this.oldHeight = height;
    }
  }

  render() {
    require('../style/main.scss');

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

const mainActions = {
  loadFromParentAction: loadFromParent,
  setFommentProductNameAction: setFommentProductName,
  updateIframeHeightAction: updateIframeHeight,
  loadFommentSectionAction: loadFommentSection,
};

Main.propTypes = {
  setFommentProductNameAction: PropTypes.func,
  loadFommentSectionAction: PropTypes.func,
  loadFromParentAction: PropTypes.func,
  updateIframeHeightAction: PropTypes.func,
};

export default connect(null, mainActions)(Main);
