import _ from 'lodash';
import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_REPLY,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  LOAD_FROM_PARENT,
  LOAD_FOMMENT_SECTION,
} from '../actions/types';

const INITIAL_STATE = {
  list: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FROM_PARENT: {
      return {
        ...state,
        list: action.payload.list,
      };
    }

    case LOAD_FOMMENT_SECTION: {
      return {
        ...state,
        list: action.payload.list,
      };
    }

    case UPDATE_COMMENT: {
      const { comment } = action.payload;
      const { id, updates } = comment;
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...state.list[id],
            ...updates,
          },
        },
      };
    }

    case ADD_COMMENT: {
      const { comment } = action.payload;
      const { id } = comment;

      return {
        ...state,
        list: {
          ...state.list,
          [id]: comment,
        },
      };
    }

    case DELETE_COMMENT: {
      const { comment } = action.payload;
      const { id } = comment;

      return {
        ...state,
        list: _.omit(state.list, id),
      };
    }

    case DELETE_REPLY: {
      const { reply } = action.payload;
      const { id, parentId } = reply;
      return {
        ...state,
        list: {
          ...state.list,
          [parentId]: {
            ...state.list[parentId],
            replies: _.omitBy(state.list[parentId].replies, (value, key) =>
            parseFloat(key) === parseFloat(id)),
          },
        },
      };
    }

    case UPDATE_REPLY: {
      const { reply } = action.payload;
      const { id, parentId, updates } = reply;
      return {
        ...state,
        list: {
          ...state.list,
          [parentId]: {
            ...state.list[parentId],
            replies: {
              ...state.list[parentId].replies,
              [id]: {
                ...state.list[parentId].replies[id],
                ...updates,
              },
            },
          },
        },
      };
    }

    case ADD_REPLY: {
      const { reply } = action.payload;
      const { id, parentId } = reply;
      return {
        ...state,
        list: {
          ...state.list,
          [parentId]: {
            ...state.list[parentId],
            replies: {
              ...state.list[parentId].replies,
              [id]: {
                ...reply,
              },
            },
          },
        },
      };
    }

    case ADD_LIKE: {
      const { comment } = action.payload;
      const { id, likes, parentId } = comment;

      if (parentId) {
        return {
          ...state,
          list: {
            ...state.list,
            [parentId]: {
              ...state.list[parentId],
              replies: {
                ...state.list[parentId].replies,
                [id]: {
                  ...comment,
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
            ...comment,
            liked: true,
            likes: likes + 1,
          },
        },
      };
    }

    case REMOVE_LIKE: {
      const { comment } = action.payload;
      const { id, likes, parentId } = comment;

      if (parentId) {
        return {
          ...state,
          list: {
            ...state.list,
            [parentId]: {
              ...state.list[parentId],
              replies: {
                ...state.list[parentId].replies,
                [id]: {
                  ...comment,
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
            ...comment,
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
