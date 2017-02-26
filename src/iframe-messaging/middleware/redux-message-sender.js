import _ from 'lodash';
import { MESSAGE_NAMESPACE } from '../config';

const messageSender = store => next => (action) => {
  const { dispatch } = store;
  const { iframeMessage } = action.payload;

  // If no iframeMessage attr do nothing
  if (!iframeMessage) return next(action);

  function handleMessage() {
    const sendMessage = new Promise((resolve) => {
      const { callback } = iframeMessage;
      if (callback) {
        const onResponse = ({ data }) => {
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
        };
        window.addEventListener('message', onResponse);
      } else {
        // no callback so ignore at this point forward on
        // post message once reducer changes hit
        next({
          ...action,
          payload: {
            ...(_.omit(action.payload, 'iframeMessage')),
          },
        });
      }

      iframeMessage.state = store.getState();

      // send action to responder
      window.parent.postMessage([MESSAGE_NAMESPACE, action], '*');
    });

    sendMessage.then((response) => {
      // Dispatch new event with response data and no iframeMessage on payload
      dispatch({
        ...action,
        payload: response,
      });
    });
  }

  return handleMessage();
};

export default messageSender;
