import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { messageSender } from '../iframe-messaging';
import { commentPager } from '../middleware';

import reducers from '../reducers';

import { commentSorter } from '../sorters';

import Main from './main';
import Iframe from './iframe';

const createStoreWithMiddleware = applyMiddleware(
  ReduxThunk,
  messageSender,
  commentPager(commentSorter),
)(createStore);

export const store = createStoreWithMiddleware(reducers);

const App = (props) => {
  const { sectionId, productName } = props;
  if (window.self === window.top) {
    return (
      <Iframe
        sectionId={sectionId}
        productName={productName}
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
  productName: PropTypes.string,
};

export default App;
