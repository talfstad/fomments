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
  payload: sortby,
});

export const addComment = post => ({
  type: ADD_COMMENT,
  payload: post,
});

export const updateComment = updates => ({
  type: UPDATE_COMMENT,
  payload: updates,
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  payload: comment,
});

export const deleteReply = reply => ({
  type: DELETE_REPLY,
  payload: reply,
});

export const addReply = reply => ({
  type: ADD_REPLY,
  payload: reply,
});

export const updateReply = updates => ({
  type: UPDATE_REPLY,
  payload: updates,
});

export const addLike = comment => ({
  type: ADD_LIKE,
  payload: comment,
});

export const removeLike = comment => ({
  type: REMOVE_LIKE,
  payload: comment,
});
