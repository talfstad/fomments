import React, { Component } from 'react';
import { MESSAGE_NAMESPACE } from '../config';

export default actions => (ComposedComponent) => {
  class MessageResponder extends Component {
    render() {
      return (
        <ComposedComponent
          ref={component =>
            MessageResponder.registerResponder(component)}
          {...this.props}
        />
      );
    }
  }

  MessageResponder.registerResponder = (component) => {
    window.addEventListener('message', ({ data }) => {
      const [namespace, action = {}] = data;
      const { iframeMessage } = action;
      const { callback } = iframeMessage;

      if (namespace !== MESSAGE_NAMESPACE) return;

      try {
        actions[action.type](component, action, (response) => {
          if (callback) {
            // send response to child
            component.el.contentWindow.postMessage([
              MESSAGE_NAMESPACE,
              { [action.type]: response },
            ], '*');
          }
        });
      } catch (err) {
        throw new Error(err);
      }
    }, false);
  };

  return MessageResponder;
};
