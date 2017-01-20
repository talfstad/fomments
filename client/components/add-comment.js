import React from 'react';

const AddComment = () =>
  <div className="row comment-row">
    <div className="profile-pic">
      <a href="#profilelink">
        <img src="/images/noprofilepic.jpg" alt="" />
      </a>
    </div>
    <div className="add-comment">
      <div className="row">
        <textarea className="active" type="text" placeholder="Add a comment..." />
      </div>
      <div className="row">
        <div className="post clearfix">
          <button className="add-comment pull-right"><em>Post</em></button>
        </div>
      </div>
    </div>
  </div>;

export default AddComment;
