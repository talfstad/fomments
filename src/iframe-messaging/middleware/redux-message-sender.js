export default () => store => next => (action) => {
  const { dispatch } = store;
  const { iframeMessage } = action.payload;

  // If no iframeMessage attr do nothing
  if (!iframeMessage) return next(action);

  function handleMessage() {
    next(action);
    // Once reducer results hit, send the state to messageResponder
    const {
        callback,
        responseEl = window.parent,
      } = iframeMessage;

    iframeMessage.state = store.getState();

    const sendMessage = new Promise((resolve) => {
        // add event listener to listen for result from parent
      if (callback) {
        const onResponse = ({ data }) => {
          const [namespace, responseData] = data;

          // if not iframe message, ignore
          if (namespace !== 'iframe-message') return;

          if (responseData) {
            const response = responseData[callback];

            if (response) {
              // we have correct response, remove listener and resolve
              window.removeEventListener('message', onResponse);
              resolve(response);
            }
          }
        };
        window.addEventListener('message', onResponse);
      }

      // send action to responder
      responseEl.postMessage(['iframe-message', action], '*');
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
