import $ from 'jquery';
import axios from 'axios';

import {
  ROOT_URL,
  CDN_ROOT_URL,
  GENERAL_SECTION_ID,
} from '../../config';

export const updateIframeHeight = (component, { payload }, next) => {
  const { height } = payload;
  const $iFrame = $(component.el);
  if (`${height}px` !== $iFrame.css('height')) {
    $iFrame.css('height', `${height}px`);
  }
  next();
};

export const loadFromParent = (component, { payload }, next) => {
  const sectionId = component.props.sectionId || GENERAL_SECTION_ID;

  const storedState = JSON.parse((localStorage.getItem(sectionId) || '{}'));
  // if (storedState && storedState !== 'undefined') {
  //   const response = JSON.parse(storedState);
  //   next(response);
  // } else
  if (!sectionId || sectionId.includes('general')) {
    // general sectionId need to get from CDN
    axios.get(`${CDN_ROOT_URL}/sections/${sectionId}`)
    .then((responseData) => {
      const response = {
        ...responseData.data,
        list: {
          ...responseData.data.list,
          ...storedState.list,
        },
      };
      localStorage.setItem(sectionId, JSON.stringify({ list: response.list }));
      next(response);
    });
  } else {
    // custom sectionId need to get it from our server
    axios.get(`${ROOT_URL}/sections/${sectionId}`)
    .then((responseData) => {
      const response = {
        ...responseData.data,
        list: {
          ...responseData.data.list,
          ...storedState.list,
        },
      };
      localStorage.setItem(sectionId, JSON.stringify({ list: response.list }));
      next(response);
    });
  }
};

export const saveToParent = (component, { iframeMessage }, next) => {
  const sectionId = component.props.sectionId || GENERAL_SECTION_ID;
  const { state } = iframeMessage;
  // Filter out things we don't want saved
  localStorage.setItem(sectionId, JSON.stringify(state.comments));
  next();
};

export const addComment = saveToParent;
export const updateComment = saveToParent;
export const deleteComment = saveToParent;
export const deleteReply = saveToParent;
export const addReply = saveToParent;
export const updateReply = saveToParent;
export const addLike = saveToParent;
export const removeLike = saveToParent;
