import {
  LOAD_FROM_PARENT,
  UPDATE_IFRAME_HEIGHT,
} from './types';

export const updateIframeHeight = height => ({
  type: UPDATE_IFRAME_HEIGHT,
  payload: {
    height,
    iframeMessage: {
      callback: false,
    },
  },
});

export const loadFromParent = () => ({
  type: LOAD_FROM_PARENT,
  payload: {
    iframeMessage: {
      callback: true,
    },
  },
});
