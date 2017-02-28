import commentPagerReducer from './reducer';

import {
  getPagedPayload,
  getSortedComments,
  getNumberCommentsToLoad,
} from './comment-pager';

import { pageReplyGetSortedAndPagedComments } from './reply-pager';

import { SET_PAGED_COMMENT_LIST } from './types';

export const reducer = commentPagerReducer;

export default (sorters = {}) => store => next => (action) => {
  const { dispatch } = store;
  const { pageComments } = action;

  // If no pageComments attr do nothing
  if (!pageComments) return next(action);

  function handlePageComments() {
    // Get state after we pass through reducers
    const state = store.getState();
    const { commentPager, comments } = state;
    const { defaultCommentsToShow, defaultCommentsToLoadAtOnce } = comments;
    const { pagedList } = commentPager;

    // Middleware options
    const {
      pageReply = null,
      showMore = false,
      sort = true,
    } = pageComments;

    // if pageReply don't re-page or sort everything
    if (pageReply) {
      dispatch({
        type: SET_PAGED_COMMENT_LIST,
        payload: pageReplyGetSortedAndPagedComments(),
      });
    } else {
      dispatch({
        type: SET_PAGED_COMMENT_LIST,
        payload: getPagedPayload(
          getSortedComments({ comments, sorters, options: { sort } }),
          pagedList,
          getNumberCommentsToLoad({
            showMore,
            defaultCommentsToShow,
            pagedList,
            defaultCommentsToLoadAtOnce,
          }),
        ),
      });
    }
  }

  next(action);
  return handlePageComments();
};
