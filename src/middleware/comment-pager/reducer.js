import { SET_PAGED_COMMENT_LIST } from './types';

const INITIAL_STATE = {
  pagedList: [],
  nextCountToLoad: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAGED_COMMENT_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
