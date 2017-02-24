export default function ({ dispatch }) {
  return next => (action) => {

    // If no save on action, do nothing
    if (!action.save) return next(action);

    // Make sure action is saved to parent
    const saveStateToParent = new Promise((resolve, reject) => {
      // send save event to parent


      // add event listener to listen for result from parent

      // on response remove it

      // on receive event resolve


    });

    saveStateToParent.then(() => {
      // dispatch new event
    });
  };
}
