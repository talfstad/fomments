import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { messageSender } from '../iframe-messaging';
import reducers from '../reducers';

import Main from './main';
import Iframe from './iframe';

const createStoreWithMiddleware = applyMiddleware(
  ReduxThunk,
  messageSender,
)(createStore);

export const store = createStoreWithMiddleware(reducers);

const App = (props) => {
  const { sectionId } = props;
  if (window.self === window.top) {
    return (
      <Iframe
        sectionId={sectionId}
        src="http://localhost:8080/index.html"
      />
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

App.propTypes = {
  sectionId: PropTypes.string,
};

export default App;
