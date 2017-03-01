import commentPagerReducer from './reducer';

import {
  getPagedPayload,
  getSortedComments,
} from './comment-pager';

import { SET_PAGED_COMMENT_LIST } from './types';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_REPLY,
  DELETE_REPLY,
} from '../../actions/types';

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
    const {
      list,
      defaultCommentsToShow,
      defaultRepliesToLoadAtOnce,
      defaultCommentsToLoadAtOnce,
    } = comments;
    const { pagedList } = commentPager;

    // Middleware options
    const {
      showMoreReplies = null,
      showMoreComments = null,
    } = pageComments;

    if (showMoreComments) {
      dispatch({
        type: SET_PAGED_COMMENT_LIST,
        payload: getPagedPayload({
          list,
          pagedListLength: pagedList.length,
          numToAdd: defaultCommentsToLoadAtOnce,
        }),
      });
    } else if (showMoreReplies) {
      const { commentId } = showMoreReplies;
      const comment = list[commentId];
      const {
        replies,
        pagedReplies = {
          pagedList: [],
          nextCountToLoad: 0,
        },
      } = comment;

      // update pagedReplies (by ref)
      comment.pagedReplies = getPagedPayload({
        list: replies,
        pagedListLength: pagedReplies.pagedList.length,
        numToAdd: defaultRepliesToLoadAtOnce,
      });

      // page it again, but load no new comments
      dispatch({
        type: SET_PAGED_COMMENT_LIST,
        payload: getPagedPayload({
          list,
          pagedListLength: pagedList.length,
          numToAdd: 0,
        }),
      });
    } else {
      switch (action.type) {
        case ADD_COMMENT: {
          // list already sorted, just add 1 comment to page
          // We always add comment to the top no matter sort order
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list,
              pagedListLength: pagedList.length,
              numToAdd: 1,
            }),
          });
          break;
        }
        case DELETE_COMMENT: {
          // remove 1 comment to page
          // We must have this comment in pagedList to delete from GUI
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list,
              pagedListLength: pagedList.length,
              numToAdd: -1,
            }),
          });
          break;
        }
        case ADD_REPLY: {
          // we always put replies at bottom
          // and use pagedList.length + 1 for reply
          const { parentId } = action.payload;
          const comment = list[parentId];
          const {
            replies,
            pagedReplies = {
              pagedList: [],
              nextCountToLoad: 0,
            },
          } = comment;

          // update pagedReplies (by ref)
          comment.pagedReplies = getPagedPayload({
            list: replies,
            pagedListLength: pagedReplies.pagedList.length,
            numToAdd: 1,
          });

          // page it again, but load no new comments
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list,
              pagedListLength: pagedList.length,
              numToAdd: 0,
            }),
          });
          break;
        }
        case DELETE_REPLY: {
          const { parentId } = action.payload;
          const comment = list[parentId];
          const {
            replies,
            pagedReplies = {
              pagedList: [],
              nextCountToLoad: 0,
            },
          } = comment;

          // update pagedReplies (by ref)
          comment.pagedReplies = getPagedPayload({
            list: replies,
            pagedListLength: pagedReplies.pagedList.length,
            numToAdd: -1,
          });

          // page it again, but load no new comments
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list,
              pagedListLength: pagedList.length,
              numToAdd: 0,
            }),
          });
          break;
        }
        default: {
          // do all, resort list create pagedList based on list, set to defaults
          const sortedList = getSortedComments({ comments, sorters });
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list: sortedList,
              pagedListLength: 0,
              numToAdd: defaultCommentsToShow,
            }),
          });
          break;
        }
      }
    }
  }

  next(action);
  return handlePageComments();
};
