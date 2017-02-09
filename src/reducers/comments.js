import _ from 'lodash';
import {
  LOAD_LOCAL_STORAGE,
  ADD_COMMENT,
  UPDATE_COMMENT,
  CHANGE_SORT_BY,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_REPLY,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
} from '../actions/types';

import INITIAL_STATE from '../initial-state';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_LOCAL_STORAGE: {
      return {
        ...state,
        list: {
          ...action.payload,
        },
      };
    }
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
    case UPDATE_COMMENT: {
      const { id, updates, save } = action.payload;
      const newState = {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...state.list[id],
            ...updates,
          },
        },
      };

      if (save) localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }
    case ADD_COMMENT: {
      const { id } = action.payload;

      const newState = {
        ...state,
        list: {
          ...state.list,
          [id]: action.payload,
        },
      };

      localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }

    case DELETE_COMMENT: {
      const { id } = action.payload;
      const newState = {
        ...state,
        list: _.omitBy(state.list, (value, key) =>
          parseFloat(key) === parseFloat(id)),
      };

      localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }

    case DELETE_REPLY: {
      const { id, parentId } = action.payload;
      const newState = {
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

      localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }

    case UPDATE_REPLY: {
      const { id, parentId, updates, save } = action.payload;

      const newState = {
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

      if (save) localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }
    case ADD_REPLY: {
      const { id, parentId } = action.payload;
      const newState = {
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

      localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }
    case ADD_LIKE: {
      const { id, likes, parentId } = action.payload;
      if (parentId) {
        const newState = {
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

        localStorage.setItem('fomments', JSON.stringify(newState.list));
        // add like to the reply of the parent comment
        return newState;
      }

      const newState = {
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

      localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }

    case REMOVE_LIKE: {
      const { id, likes, parentId } = action.payload;
      if (parentId) {
        const newState = {
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

        localStorage.setItem('fomments', JSON.stringify(newState.list));

        // add like to the reply of the parent comment
        return newState;
      }

      const newState = {
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

      localStorage.setItem('fomments', JSON.stringify(newState.list));

      return newState;
    }
    default:
      return state;
  }
};
