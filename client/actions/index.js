import {
  CHANGE_SORT_BY,
  ADD_COMMENT,
} from './types';

export const changeSortBy = sortby => ({
  type: CHANGE_SORT_BY,
  payload: sortby,
});

export const addComment = post => ({
  type: ADD_COMMENT,
  payload: post,
});
