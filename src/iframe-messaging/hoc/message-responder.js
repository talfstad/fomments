import React, { Component } from 'react';

export default actions => (ComposedComponent) => {
  class MessageResponder extends Component {
    render() {
      return (
        <ComposedComponent
          ref={component =>
            MessageResponder.registerResponder(component)}
        />
      );
    }
  }

  MessageResponder.registerResponder = (component) => {
    window.addEventListener('message', ({ data }) => {
      const [namespace, requestedAction = {}] = data;
      const { iframeMessage } = requestedAction.payload;
      const {
        action,
        callback,
      } = iframeMessage;

      if (namespace !== 'iframe-message') return;

      if (actions[action]) {
        actions[action](component, requestedAction, (response) => {
          if (callback) {
            // send response to child
            component.postMessage([
              'iframe-message',
              callback,
              response,
            ], '*');
          }
        });
      }
    }, false);
  };

  return MessageResponder;
};
