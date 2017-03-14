import {
  LOAD_FROM_PARENT,
  LOAD_FOMMENT_SECTION,
  CHANGE_SORT_BY,
} from '../actions/types';

const INITIAL_STATE = {
  top: true,
  newest: false,
  oldest: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FROM_PARENT: {
      return {
        ...state,
        ...action.payload.sortBy,
      };
    }
    case LOAD_FOMMENT_SECTION: {
      return {
        ...state,
        ...action.payload.sortBy,
      };
    }
    case CHANGE_SORT_BY: {
      const { sortBy } = action.payload;
      const newState = {
        top: false,
        newest: false,
        oldest: false,
      };

      newState[sortBy] = true;

      return {
        ...state,
        ...newState,
      };
    }
    default:
      return state;
  }
};
