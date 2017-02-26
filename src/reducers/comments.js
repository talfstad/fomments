import _ from 'lodash';
import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  CHANGE_SORT_BY,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_REPLY,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  LOAD_FROM_PARENT,
} from '../actions/types';

import INITIAL_STATE from '../initial-state';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FROM_PARENT: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CHANGE_SORT_BY: {
      const { sortyBy } = action.payload;
      const newState = {
        top: false,
        newest: false,
        oldest: false,
      };
      newState[sortyBy] = true;

      return {
        ...state,
        newState,
      };
    }

    case UPDATE_COMMENT: {
      const { updates } = action.payload;
      const { id } = updates;
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
      const { post } = action.payload;
      const { id } = post;

      return {
        ...state,
        list: {
          ...state.list,
          [id]: post,
        },
      };
    }

    case DELETE_COMMENT: {
      const { comment } = action.payload;
      const { id } = comment;

      return {
        ...state,
        list: _.omitBy(state.list, (value, key) =>
          parseFloat(key) === parseFloat(id)),
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
      const { updates } = action.payload;
      const { id, parentId } = updates;
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
