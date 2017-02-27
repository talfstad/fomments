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
} from './types';

export const showMoreComments = () => ({
  type: SHOW_MORE_COMMENTS,
  pageComments: {
    showMore: true,
    sort: true,
  },
});

export const changeSortBy = sortBy => ({
  type: CHANGE_SORT_BY,
  payload: {
    sortBy,
  },
  pageComments: {
    sort: true,
  },
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
  pageComments: {
    sort: true,
  },
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
  pageComments: {
    sort: true,
  },
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  payload: {
    comment,
  },
  iframeMessage: {
    callback: false,
  },
  pageComments: {
    sort: true,
  },
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
