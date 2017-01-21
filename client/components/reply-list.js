import React from 'react';

const ReplyList = () =>
  <div className="replies">
    <div className="row comment-row">
      <div className="comment-menu">
        <div className="menu dropdown">
          <button className="comment-menu-dropdown pull-right dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="down-arrow-wide" />
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="comment-menu-dropdown">
            <ul role="menu">
              <li>
                <a href="#f"><em>Collapse comment</em></a>
              </li>
              <li>
                <a className="" href="#d"><em>Mark as spam</em></a>
              </li>
              <li>
                <a className="" href="#f"><em>Report</em></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="profile-pic">
        <a href="#profilelink">
          <img src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/c0.12.48.48/p48x48/5417_10208966960280793_2802424953995387521_n.jpg?oh=ad0814b805499e5987de27f8407cf608&oe=591F107C" alt="" />
        </a>
      </div>

      <div className="comment-detail">
        <div className="row">
          <div className="user-info">
            <a className="name" href="#profilelink">Jim Tritt</a>
            <span className="dot"> · </span>
            <a className="page" href="#facebookpage">Tokyo, Japan</a>
          </div>
          <div className="comment-text">
          Lucks performance last year, which you deem inadequate ----
          PFF Top-graded NFL QBs 2016 Season:
          Lucks performance last year, which you deem inadequate ----
          PFF Top-graded NFL QBs 2016 Season:
        </div>
        </div>
        <div className="row comment-info">
          <a href="#like"><em>Like</em></a>
          <span className="dot"> · </span>
          <a href="#reply"><em>Reply</em></a>
          <span className="dot"> · </span>
          <span>
            <i className="like-icon" /> 7
        </span>
          <span className="dot"> · </span>
        Nov 21, 2106 12:51am
      </div>
      </div>
    </div>

    <div className="row comment-row">
      <div className="profile-pic">
        <a href="#profilelink">
          <img src="/images/noprofilepic.jpg" alt="" />
        </a>
      </div>
      <div className="add-comment reply">
        <div className="row">
          <textarea type="text" placeholder="Add a reply..." />
        </div>
        <div className="row">
          <div className="post clearfix">
            <button className="add-comment disabled pull-right"><em>Reply</em></button>
            <button className="cancel-comment mr5 pull-right"><em>Cancel</em></button>
          </div>
        </div>
      </div>
    </div>
    <div className="show-more-replies">
      <a href="#show-more-replies"><em>Show 10 more replies in this thread</em><i className="more-replies-arrow" /></a>
    </div>
  </div>;

export default ReplyList;
