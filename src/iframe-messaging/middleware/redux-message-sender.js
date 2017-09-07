import _ from 'lodash';
import { MESSAGE_NAMESPACE } from '../config';

const messageSender = store => next => (action) => {
  const { dispatch } = store;
  const { iframeMessage } = action;

  // If no iframeMessage attr do nothing
  if (!iframeMessage) return next(action);

  function handleMessage() {
    const sendMessage = new Promise((resolve) => {
      const { callback } = iframeMessage;
      if (callback) {
        const onResponse = ({ data }) => {
          // Input validation
          if (_.isArray(data)) {
            const [namespace, responseData] = data;

            // if not iframe message, ignore
            if (namespace !== MESSAGE_NAMESPACE) return;

            if (responseData) {
              const response = responseData[action.type];
              if (response) {
                // we have correct response, remove listener and resolve
                window.removeEventListener('message', onResponse);
                resolve(response);
              }
            }
          }
        };
        window.addEventListener('message', onResponse);
      } else {
        // no callback so ignore at this point forward on
        // post message once reducer changes hit
        next(action);
      }

      iframeMessage.state = store.getState();
      // send action to responder
      window.parent.postMessage([MESSAGE_NAMESPACE, action], '*');
    });

    sendMessage.then((response) => {
      // Dispatch new event with response data and no iframeMessage on payload
      dispatch({
        ...(_.omit(action, 'iframeMessage')),
        payload: response,
      });
    });
  }

  return handleMessage();
};

export default messageSender;
