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
} from './types';

export const changeSortBy = sortby => ({
  type: CHANGE_SORT_BY,
  payload: {
    sortby,
  },
});

export const addComment = post => ({
  type: ADD_COMMENT,
  payload: {
    post,
    iframeMessage: {
      callback: false,
    },
  },
});

export const updateComment = updates => ({
  type: UPDATE_COMMENT,
  payload: {
    updates,
    iframeMessage: {
      callback: false,
    },
  },
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  payload: {
    comment,
    iframeMessage: {
      callback: false,
    },
  },
});

export const deleteReply = reply => ({
  type: DELETE_REPLY,
  payload: {
    reply,
    iframeMessage: {
      callback: false,
    },
  },
});

export const addReply = reply => ({
  type: ADD_REPLY,
  payload: {
    reply,
    iframeMessage: {
      callback: false,
    },
  },
});

export const updateReply = updates => ({
  type: UPDATE_REPLY,
  payload: {
    updates,
    iframeMessage: {
      callback: false,
    },
  },
});

export const addLike = comment => ({
  type: ADD_LIKE,
  payload: {
    comment,
    iframeMessage: {
      callback: false,
    },
  },
});

export const removeLike = comment => ({
  type: REMOVE_LIKE,
  payload: {
    comment,
    iframeMessage: {
      callback: false,
    },
  },
});
