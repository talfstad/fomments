import {
  LOAD_FROM_PARENT,
  UPDATE_IFRAME_HEIGHT,
} from './types';

export const updateIframeHeight = height => (dispatch) => {
  setTimeout(dispatch({
    type: UPDATE_IFRAME_HEIGHT,
    payload: {
      height,
    },
    iframeMessage: {
      callback: false,
    },
  }));
};

export const loadFromParent = () => ({
  type: LOAD_FROM_PARENT,
  iframeMessage: {
    callback: true,
  },
  pageComments: true,
});
