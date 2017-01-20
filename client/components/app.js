import React from 'react';
import Header from './header';
import AddComment from './add-comment';
import CommentList from './comment-list';

const App = () =>
  <div className="container-fluid fomments-container">
    <div className="comment-container">
      <Header />
      <AddComment />
    </div>
  </div>;

export default App;
