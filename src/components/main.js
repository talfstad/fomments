import React, { PropTypes } from 'react';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';

const Main = props =>
  <div ref={(c) => { props.setEl(c); }} className="container-fluid fomments-container">
    <div className="comment-container">
      <Header />
      <CommentList />
      <CreditLink />
    </div>
  </div>;

Main.propTypes = {
  setEl: PropTypes.func,
};

export default Main;
