import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';

import * as actions from '../actions/index';

class App extends Component {
  componentWillMount() {
    // load up the data
    const { loadLocalStorageState } = this.props;
    if (localStorage) {
      const comments = JSON.parse(localStorage.getItem('fomments'));
      if (comments) {
        loadLocalStorageState(comments);
      } else {
        localStorage.setItem('fomments', JSON.stringify(this.props.comments));
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

export default connect(null, actions)(App);
