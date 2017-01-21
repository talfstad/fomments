import React from 'react';

// Comment has a reply list

const Comment = () =>
  <div>
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
                <a className="" href="#d"><em>Report</em></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="profile-pic">
        <a href="#profilelink">
          <img src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p48x48/10653562_933461080080555_2573322228358397722_n.jpg?oh=b896e112dd202abd81708cf405272c25&oe=59052C88" alt="" />
        </a>
      </div>
      <div className="comment-detail">
        <div className="row">
          <div className="user-info">
            <a className="name" href="#profilelink">Cristi Selvaggio-Loken</a>
            <span className="dot"> · </span>
            <a className="page" href="#facebookpage">Covina High</a>
          </div>
          <div className="comment-text">
          And that my friends is why President Elect Donald Trump won.
          We are sick of it. We are sick of the left claiming to be
          the ones that are tolerant but at every chance they
          get they call us racists, bigots, homophobes, zenophobes,
          and every other phobes and ists you can think of and
          every time they are running for anything they pull the
          race card. I am 56 years old and as long as I have been a
          voter they have been doing this and they have lumped me
          in with all this long enough. I am so sick of these
          politically correct babies<span className="see-more">... <a href="#df">See More</a></span>
          </div>
        </div>
        <div className="row comment-info">
          <a href="#like"><em>Like</em></a>
          <span className="dot"> · </span>
          <a href="#reply"><em>Reply</em></a>
          <span className="dot"> · </span>
          <span>
            <i className="like-icon" /> 547
        </span>
          <span className="dot"> · </span>
        Nov 20, 2106 7:57pm
      </div>
      </div>
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

      </div>
    </div>
  </div>;

export default Comment;
