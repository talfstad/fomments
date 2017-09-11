import $ from 'jquery';
import axios from 'axios';

import Config from '../../config';

const {
  ROOT_URL,
  CDN_ROOT_URL,
} = Config(process.env.NODE_ENV);

export const updateIframeHeight = (component, { payload }, next) => {
  const { height } = payload;
  const $iFrame = $(component.el);
  if (`${height}px` !== $iFrame.css('height')) {
    $iFrame.css('height', `${height}px`);
  }
  next();
};

const requestSection = (sectionId) => {
  let request;

  if (sectionId.includes('english')) {
    // english are all free sectionId need to get from CDN
    // loaded from CDN
    request = axios.get(`${CDN_ROOT_URL}/sections/${sectionId}`);
  } else {
    request = axios.get(`${ROOT_URL}/sections/${sectionId}`);
  }

  return request;
};

export const loadFommentSection = (component, { payload }, next) => {
  const {
    sectionId,
    productName,
  } = payload;

  const storedState = JSON.parse((localStorage.getItem(sectionId) || '{}'));
  requestSection(sectionId).then((responseData) => {
    const response = {
      ...responseData.data,
      sectionInfo: {
        ...responseData.data.sectionInfo,
        productName,
      },
      list: {
        ...responseData.data.list,
        ...storedState.list,
      },
    };
    localStorage.setItem(sectionId, JSON.stringify({ list: response.list }));
    next(response);
  });
};

export const loadFromParent = (component, { payload }, next) => {
  const sectionId = component.props.sectionId;
  const productName = component.props.productName;
  const storedState = JSON.parse((localStorage.getItem(sectionId) || '{}'));

  if (!sectionId) {
    // No sectionId to get
    next({ list: {} });
  } else {
    requestSection(sectionId).then((responseData) => {
      const response = {
        ...responseData.data,
        sectionInfo: {
          ...responseData.data.sectionInfo,
          productName,
        },
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
  const { state } = iframeMessage;
  const sectionId = state.sectionInfo.id;
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
