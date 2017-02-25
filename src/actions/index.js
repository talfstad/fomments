// import axios from 'axios';

import {
  CHANGE_SORT_BY,
  ADD_COMMENT,
  UPDATE_COMMENT,
  ADD_REPLY,
  UPDATE_REPLY,
  ADD_LIKE,
  REMOVE_LIKE,
  DELETE_COMMENT,
  DELETE_REPLY,
  LOAD_FROM_PARENT,
} from './types';

// const ROOT_URL = 'http://localhost:3000';
// const CDN_ROOT_URL = 'http://localhost:3000';

export const loadFromParent = () => ({
  type: LOAD_FROM_PARENT,
  payload: {
    iframeMessage: {
      callback: true,
    },
  },
});

// export const loadInitialState = ({ sectionId }) => (dispatch) => {
//   const storedState = localStorage.getItem(sectionId);
//   if (storedState) {
//     const state = JSON.parse(storedState);
//     dispatch({
//       type: LOAD_INITIAL_STATE,
//       payload: state,
//     });
//   } else if (!sectionId || sectionId.includes('general')) {
//     // general sectionId need to get from CDN
//     axios.get(`${CDN_ROOT_URL}/sections/${sectionId}`)
//     .then(({ data }) => {
//       localStorage.setItem(sectionId, JSON.stringify(data));
//       dispatch({
//         type: LOAD_INITIAL_STATE,
//         payload: data,
//       });
//     });
//   } else {
//     // custom sectionId need to get it from our server
//     axios.get(`${ROOT_URL}/sections/${sectionId}`)
//     .then(({ data }) => {
//       localStorage.setItem(sectionId, JSON.stringify(data));
//       dispatch({
//         type: LOAD_INITIAL_STATE,
//         payload: data,
//       });
//     });
//   }
// };

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
