import {
  CHANGE_SORT_BY,
} from './types';

export const changeSortBy = sortby => ({
  type: CHANGE_SORT_BY,
  payload: sortby,
});
