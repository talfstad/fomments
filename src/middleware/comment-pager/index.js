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
  CHANGE_SORT_BY,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  ADD_LIKE,
  REMOVE_LIKE,
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
    const { commentPager, comments, user, sectionInfo, sortBy } = state;
    const {
      defaultCommentsToShow,
      defaultRepliesToShow,
      defaultRepliesToLoadAtOnce,
      defaultCommentsToLoadAtOnce,
    } = sectionInfo;

    const { pagedList } = commentPager;

    // Middleware options
    const {
      showMoreReplies = null,
      showMoreComments = null,
    } = pageComments;

    const sortedList = getSortedComments({ comments, user, sortBy, sorters }).map((comment) => {
      const { replies } = comment;

      if (replies) {
        const sortedReplies = getSortedComments({
          comments: { list: replies },
          user,
          sortBy: { oldest: true },
          sorters,
        });

        // if you have pagedReplies for this comment already loaded, use them
        // otherwise load the default
        const [pagedListComment] = pagedList.filter(o => o.id === comment.id);
        if (pagedListComment) {
          const {
            pagedReplies = {
              nextCountToLoad: 0,
              pagedList: [],
            },
          } = pagedListComment;
          // Comment is in the paged list, get how many replies are showing and
          // show that many but use the new comment replies
          // Comment is in the paged list, get how many replies are showing and
          // show that many but use the new comment replies
          return {
            ...comment,
            pagedReplies: {
              ...pagedReplies,
              pagedList: sortedReplies.slice(0, pagedReplies.pagedList.length),
            },
          };
        }

        const {
          pagedReplies = {
            pagedList: [],
          },
        } = comment;

        return {
          ...comment,
          pagedReplies: getPagedPayload({
            list: sortedReplies,
            numToAdd: defaultRepliesToShow,
            pagedListLength: pagedReplies.pagedList.length,
            defaultToLoadAtOnce: defaultRepliesToLoadAtOnce,
          }),
        };
      }

      return comment;
    });

    if (showMoreComments) {
      dispatch({
        type: SET_PAGED_COMMENT_LIST,
        payload: getPagedPayload({
          list: sortedList,
          pagedListLength: pagedList.length,
          numToAdd: defaultCommentsToLoadAtOnce,
          defaultToLoadAtOnce: defaultCommentsToLoadAtOnce,
        }),
      });
    } else if (showMoreReplies) {
      const { commentId } = showMoreReplies;
      const [comment] = sortedList.filter(o => o.id === commentId);
      const {
        replies,
        pagedReplies = {
          pagedList: [],
          nextCountToLoad: 0,
        },
      } = comment;

      const sortedReplies = getSortedComments({
        comments: { list: replies },
        user,
        sortBy: { oldest: true },
        sorters,
      });

      // Replace in place since array
      comment.pagedReplies = getPagedPayload({
        list: sortedReplies,
        pagedListLength: pagedReplies.pagedList.length,
        numToAdd: defaultRepliesToLoadAtOnce,
        defaultToLoadAtOnce: defaultRepliesToLoadAtOnce,
      });

      // page it again, but load no new comments
      dispatch({
        type: SET_PAGED_COMMENT_LIST,
        payload: getPagedPayload({
          list: sortedList,
          pagedListLength: pagedList.length,
          numToAdd: 0,
          defaultToLoadAtOnce: defaultCommentsToLoadAtOnce,
        }),
      });
    } else {
      switch (action.type) {
        case ADD_COMMENT: {
          const { comment } = action.payload;

          // add it to the top of newPagedlist and set it
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: {
              ...commentPager,
              pagedList: [comment, ...pagedList],
            },
          });
          break;
        }

        case DELETE_COMMENT: {
          const { comment } = action.payload;

          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: {
              ...commentPager,
              pagedList: pagedList.filter(o => o.id !== comment.id),
            },
          });
          break;
        }

        case ADD_REPLY: {
          const { reply } = action.payload;
          const [comment] = sortedList.filter(o => o.id === reply.parentId);
          const {
            pagedReplies = {
              nextCountToLoad: 0,
              pagedList: [],
            },
          } = comment;

          comment.pagedReplies = {
            ...pagedReplies,
            pagedList: [...pagedReplies.pagedList, reply],
          };

          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list: sortedList,
              pagedListLength: pagedList.length,
              numToAdd: 0,
              defaultToLoadAtOnce: defaultCommentsToLoadAtOnce,
            }),
          });
          break;
        }

        case DELETE_REPLY: {
          const { reply } = action.payload;
          const [comment] = sortedList.filter(o => o.id === reply.parentId);
          // replies is already re-sorted and re-paged which adds an extra
          // reply on if there were any left to page. In that case
          // we need to pop it back off
          if (comment.pagedReplies.nextCountToLoad > 0) {
            comment.pagedReplies.pagedList.pop();
          }
          comment.pagedReplies = {
            ...comment.pagedReplies,
            pagedList: comment.pagedReplies.pagedList,
          };
          // page it again, but load no new comments
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list: sortedList,
              pagedListLength: pagedList.length,
              numToAdd: 0,
              defaultToLoadAtOnce: defaultCommentsToLoadAtOnce,
            }),
          });
          break;
        }
        case ADD_LIKE:
        case REMOVE_LIKE:
        case UPDATE_REPLY:
        case UPDATE_COMMENT:
        case CHANGE_SORT_BY: {
          // sort it and reset it, but don't show more
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list: sortedList,
              pagedListLength: pagedList.length,
              numToAdd: 0,
              defaultToLoadAtOnce: defaultCommentsToLoadAtOnce,
            }),
          });
          break;
        }

        default: {
          // do all, sort list create pagedList based on list, set to defaults
          // this should only be done on initial load
          dispatch({
            type: SET_PAGED_COMMENT_LIST,
            payload: getPagedPayload({
              list: sortedList,
              pagedListLength: 0,
              numToAdd: defaultCommentsToShow,
              defaultToLoadAtOnce: defaultCommentsToLoadAtOnce,
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
