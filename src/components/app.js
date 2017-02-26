import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { messageSender } from '../iframe-messaging';
import reducers from '../reducers';

import Main from './main';
import Iframe from './iframe';

class App extends Component {
  getStore() {
    if (!this.store) {
      const createStoreWithMiddleware = applyMiddleware(
        ReduxThunk,
        messageSender,
      )(createStore);
      this.store = createStoreWithMiddleware(reducers);
    }
    return this.store;
  }

  render() {
    const { sectionId } = this.props;
    if (window.self === window.top) {
      return (
        <Iframe
          sectionId={sectionId}
          src="http://localhost:8080/index.html"
        />
      );
    }

    return (
      <Provider store={this.getStore()}>
        <Main />
      </Provider>
    );
  }
}

App.propTypes = {
  sectionId: PropTypes.string,
};

export default App;
