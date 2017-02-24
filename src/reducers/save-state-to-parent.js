import _ from 'lodash';
import jQuery from 'jquery';
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
  SET_IFRAME_STATE,
  LOAD_INITIAL_STATE,
} from '../actions/types';

import INITIAL_STATE from '../initial-state';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fully load in state from remote
    case SET_IFRAME_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOAD_INITIAL_STATE: {
      const fommentsIframeEl = jQuery('#fomments iframe')[0];
      const newState = {
        ...state,
        ...action.payload,
      };

      fommentsIframeEl.contentWindow
        .postMessage(['setInitialState', newState], '*');

      return newState;
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
      const sectionId = state.id;
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

      if (save) localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }
    case ADD_COMMENT: {
      const sectionId = state.id;
      const { id } = action.payload;

      const newState = {
        ...state,
        list: {
          ...state.list,
          [id]: action.payload,
        },
      };

      localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }

    case DELETE_COMMENT: {
      const sectionId = state.id;
      const { id } = action.payload;
      const newState = {
        ...state,
        list: _.omitBy(state.list, (value, key) =>
          parseFloat(key) === parseFloat(id)),
      };

      localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }

    case DELETE_REPLY: {
      const sectionId = state.id;
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

      localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }

    case UPDATE_REPLY: {
      const sectionId = state.id;
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

      if (save) localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }
    case ADD_REPLY: {
      const sectionId = state.id;
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

      localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }
    case ADD_LIKE: {
      const sectionId = state.id;
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

        localStorage.setItem(sectionId, JSON.stringify(newState.list));
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

      localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }

    case REMOVE_LIKE: {
      const sectionId = state.id;
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

        localStorage.setItem(sectionId, JSON.stringify(newState.list));

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

      localStorage.setItem(sectionId, JSON.stringify(newState.list));

      return newState;
    }
    default:
      return state;
  }
};
