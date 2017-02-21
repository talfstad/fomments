import axios from 'axios';

import {
  LOAD_LOCAL_STORAGE,
  CHANGE_SORT_BY,
  ADD_COMMENT,
  UPDATE_COMMENT,
  ADD_REPLY,
  UPDATE_REPLY,
  ADD_LIKE,
  REMOVE_LIKE,
  DELETE_COMMENT,
  DELETE_REPLY,
} from './types';

const ROOT_URL = 'http://localhost:3000';
const CDN_ROOT_URL = 'http://localhost:3000';

export const loadLocalStorageState = state => ({
  type: LOAD_LOCAL_STORAGE,
  payload: state,
});

export const loadLocalStorageStateAsync = ({ sectionId }) =>
  (dispatch) => {
    // if sectionId is not a custom section get from CDN
    if (!sectionId || sectionId.includes('general')) {
      // general sectionId need to get from CDN
      axios.get(`${CDN_ROOT_URL}/sections/${sectionId}`)
      .then(({ data }) => {
        localStorage.setItem(sectionId, JSON.stringify(data.list));
        dispatch(loadLocalStorageState(data.list));
      })
      .catch(() => {

      });
    } else {
      // custom sectionId need to get it from our server
      axios.get(`${ROOT_URL}/sections/${sectionId}`)
      .then(({ data }) => {
        localStorage.setItem(sectionId, JSON.stringify(data.list));
        dispatch(loadLocalStorageState(data.list));
      })
      .catch(() => {

      });
    }
  };

export const changeSortBy = sortby => ({
  type: CHANGE_SORT_BY,
  payload: sortby,
});

export const addComment = post => ({
  type: ADD_COMMENT,
  payload: post,
});

export const updateComment = updates => ({
  type: UPDATE_COMMENT,
  payload: updates,
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  payload: comment,
});

export const deleteReply = reply => ({
  type: DELETE_REPLY,
  payload: reply,
});

export const addReply = reply => ({
  type: ADD_REPLY,
  payload: reply,
});

export const updateReply = updates => ({
  type: UPDATE_REPLY,
  payload: updates,
});

export const addLike = comment => ({
  type: ADD_LIKE,
  payload: comment,
});

export const removeLike = comment => ({
  type: REMOVE_LIKE,
  payload: comment,
});
