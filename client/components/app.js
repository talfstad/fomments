import React from 'react';
import Header from './header';
import CommentList from './comment-list';
import CreditLink from './credit-link';

const App = () =>
  <div className="container-fluid fomments-container">
    <div className="comment-container">
      <Header />
      <CommentList />
      <CreditLink />
    </div>
  </div>;

export default App;
