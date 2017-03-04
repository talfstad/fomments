import {
  LOAD_FROM_PARENT,
} from '../actions/types';

const INITIAL_STATE = {
  defaultCommentsToShow: 1,
  defaultCommentsToLoadAtOnce: 1,
  defaultRepliesToShow: 3,
  defaultRepliesToLoadAtOnce: 10,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FROM_PARENT: {
      return {
        ...state,
        ...action.payload.sectionInfo,
      };
    }
    default:
      return state;
  }
};
