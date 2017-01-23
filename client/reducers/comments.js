import {
  ADD_COMMENT,
  CHANGE_SORT_BY,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_REPLY,
} from '../actions/types';

import { INITIAL_STATE } from '../defaults';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SORT_BY: {
      const sortBy = {
        top: false,
        newest: false,
        oldest: false,
      };
      sortBy[action.payload] = true;

      return {
        ...state,
        sortBy,
      };
    }
    case ADD_COMMENT: {
      const { id } = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          [id]: action.payload,
        },
      };
    }
    case ADD_REPLY: {
      const { id, parentId } = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          [parentId]: {
            ...state.list[parentId],
            replies: {
              ...state.list[parentId].replies,
              [id]: {
                ...action.payload,
              },
            },
          },
        },
      };
    }
    case ADD_LIKE: {
      const { id, likes, parentId } = action.payload;
      if (parentId) {
        // add like to the reply of the parent comment
        return {
          ...state,
          list: {
            ...state.list,
            [parentId]: {
              ...state.list[parentId],
              replies: {
                ...state.list[parentId].replies,
                [id]: {
                  ...action.payload,
                  liked: true,
                  likes: likes + 1,
                },
              },
            },
          },
        };
      }
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...action.payload,
            liked: true,
            likes: likes + 1,
          },
        },
      };
    }
    case REMOVE_LIKE: {
      const { id, likes, parentId } = action.payload;
      if (parentId) {
        // add like to the reply of the parent comment
        return {
          ...state,
          list: {
            ...state.list,
            [parentId]: {
              ...state.list[parentId],
              replies: {
                ...state.list[parentId].replies,
                [id]: {
                  ...action.payload,
                  liked: false,
                  likes: likes - 1,
                },
              },
            },
          },
        };
      }

      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...action.payload,
            liked: false,
            likes: likes - 1,
          },
        },
      };
    }
    default:
      return state;
  }
};
