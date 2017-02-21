import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';
import * as actions from '../actions';

class Main extends Component {

  componentWillMount() {
    // load up the data
    const {
      sectionId,
      loadLocalStorageState,
      loadLocalStorageStateAsync,
    } = this.props;

    if (localStorage) {
      const storedComments = localStorage.getItem(sectionId);
      // localStorage keeps things as strings so test string undefined
      if (storedComments) {
        loadLocalStorageState(JSON.parse(storedComments));
      } else {
        // Request initial state based on section id, user id
        loadLocalStorageStateAsync({ sectionId });
      }
    }
  }

  render() {
    return (
      <div ref={(c) => { this.props.setEl(c); }} className="container-fluid fomments-container">
        <div className="comment-container">
          <Header />
          <CommentList />
          <CreditLink />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  setEl: PropTypes.func,
  sectionId: PropTypes.string,
  loadLocalStorageState: PropTypes.func,
  loadLocalStorageStateAsync: PropTypes.func,
};

export default connect(null, actions)(Main);
