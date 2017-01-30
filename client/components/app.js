import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';

import INITIAL_STATE from '../initial-state';
import * as actions from '../actions/index';

class App extends Component {
  componentWillMount() {
    // load up the data
    const { loadLocalStorageState } = this.props;
    if (localStorage) {
      const storedComments = localStorage.getItem('fomments');
      // localStorage keeps things as strings so test string undefined
      if (storedComments) {
        loadLocalStorageState(JSON.parse(storedComments));
      } else {
        localStorage.setItem('fomments', JSON.stringify(INITIAL_STATE.list));
      }
    }
  }

  render() {
    return (
      <div className="container-fluid fomments-container">
        <div className="comment-container">
          <Header />
          <CommentList />
          <CreditLink />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  loadLocalStorageState: PropTypes.func,
};

export default connect(null, actions)(App);
