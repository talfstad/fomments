import {
  LOAD_FROM_PARENT,
} from '../actions/types';

const INITIAL_STATE = {
  id: 134,
  name: 'Customer Comment',
  url: '',
  image: '/images/noprofilepic.jpg',
  affiliation: {
    name: '',
    url: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FROM_PARENT: {
      return {
        ...state,
        ...action.payload.user,
      };
    }
    default:
      return state;
  }
};
