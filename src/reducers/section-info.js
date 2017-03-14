import {
  LOAD_FROM_PARENT,
  LOAD_FOMMENT_SECTION,
  SET_FOMMENT_SECTION_PRODUCT_NAME,
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

    case LOAD_FOMMENT_SECTION: {
      return {
        ...state,
        ...action.payload.sectionInfo,
      };
    }

    case SET_FOMMENT_SECTION_PRODUCT_NAME: {
      const { productName } = action.payload;
      return {
        ...state,
        productName,
      };
    }

    default:
      return state;
  }
};
