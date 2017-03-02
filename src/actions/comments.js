import {
  CHANGE_SORT_BY,
  ADD_COMMENT,
  UPDATE_COMMENT,
  ADD_REPLY,
  UPDATE_REPLY,
  ADD_LIKE,
  REMOVE_LIKE,
  DELETE_COMMENT,
  DELETE_REPLY,
  SHOW_MORE_COMMENTS,
  SHOW_MORE_REPLIES,
} from './types';

export const showMoreComments = () => ({
  type: SHOW_MORE_COMMENTS,
  pageComments: {
    showMoreComments: true,
  },
});

export const showMoreReplies = commentId => ({
  type: SHOW_MORE_REPLIES,
  pageComments: {
    showMoreReplies: {
      commentId,
    },
  },
});

export const changeSortBy = sortBy => ({
  type: CHANGE_SORT_BY,
  payload: {
    sortBy,
  },
  pageComments: true,
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
  pageComments: true,
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
  pageComments: true,
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
  pageComments: true,
});

export const deleteReply = reply => ({
  type: DELETE_REPLY,
  payload: {
    reply,
  },
  iframeMessage: {
    callback: false,
  },
});

export const addReply = reply => ({
  type: ADD_REPLY,
  payload: {
    reply,
  },
  iframeMessage: {
    callback: false,
  },
});

export const updateReply = reply => ({
  type: UPDATE_REPLY,
  payload: {
    reply,
  },
  iframeMessage: {
    callback: false,
  },
});

export const addLike = comment => ({
  type: ADD_LIKE,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
});

export const removeLike = comment => ({
  type: REMOVE_LIKE,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
});
