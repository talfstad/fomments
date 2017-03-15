import {
  LOAD_FROM_PARENT,
  UPDATE_IFRAME_HEIGHT,
  LOAD_FOMMENT_SECTION,
  SET_FOMMENT_SECTION_PRODUCT_NAME,
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

export const setFommentProductName = productName => ({
  type: SET_FOMMENT_SECTION_PRODUCT_NAME,
  payload: {
    productName,
  },
});

export const loadFommentSection = ({ sectionId, productName }) => ({
  type: LOAD_FOMMENT_SECTION,
  payload: {
    sectionId,
    productName,
  },
  iframeMessage: {
    callback: true,
  },
  pageComments: true,
});
