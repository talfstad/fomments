export default function ({ dispatch }) {
  return next => (action) => {

    // If no iframeMessage attr do nothing
    // if we have one send message out

    // if we send message and need response then we wait for it and then dispatch
    // a new event with the data all there

    // if we send message and don't need response we remove the iframeMessage object
    // from payload and create a new event

    if (!action.save) return next(action);

    // Make sure action is saved to parent
    const saveStateToParent = new Promise((resolve, reject) => {
      // send save event to parent
      window.parent.postMessage(['saveStateToParent', action.payload], '*');


      // add event listener to listen for result from parent

      // on response remove it

      // on receive event resolve


    });

    saveStateToParent.then(() => {
      // dispatch new event
    });
  };
}
