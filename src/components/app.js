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

import Config from '../config';

const {
  CDN_ROOT_URL,
} = Config(process.env.NODE_ENV);

const createStoreWithMiddleware = applyMiddleware(
  ReduxThunk,
  messageSender,
  commentPager(commentSorter),
)(createStore);

export const store = createStoreWithMiddleware(reducers);

const App = (props) => {
  const { sectionId, productName } = props;
  const locationRegex = new RegExp('fomments-18fj8FA8f38j301f8j13f8jdfks.html$');

  if (!locationRegex.test(location.href)) {
    return (
      <Iframe
        sectionId={sectionId}
        productName={productName}
        src={`${CDN_ROOT_URL}/fomments-18fj8FA8f38j301f8j13f8jdfks.html`}
      />
    );
  }

  // Require bootstrap ONLY inside IFRAME to not mess up other bootstrap
  // installations
  require('bootstrap');

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
