import React, { Component } from 'react';
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
    if (window.self === window.top) {
      return (
        <Iframe
          sectionId={this.sectionId}
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

export default App;
