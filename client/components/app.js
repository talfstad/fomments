import React from 'react';
import Header from './header';
import AddComment from './add-comment';
import CommentList from './comment-list';
import CommentPaging from './comment-paging';
import CreditLink from './credit-link';

const App = () =>
  <div className="container-fluid fomments-container">
    <div className="comment-container">
      <Header />
      <AddComment />
      <CommentList />
      <CommentPaging />
      <CreditLink />
    </div>
  </div>;

export default App;
