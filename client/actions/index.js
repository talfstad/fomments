import {
  CHANGE_SORT_BY,
  ADD_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
} from './types';

export const changeSortBy = sortby => ({
  type: CHANGE_SORT_BY,
  payload: sortby,
});

export const addComment = post => ({
  type: ADD_COMMENT,
  payload: post,
});

export const addLike = comment => ({
  type: ADD_LIKE,
  payload: comment,
});

export const removeLike = comment => ({
  type: REMOVE_LIKE,
  payload: comment,
});
