import $ from 'jquery';

export const updateIframeHeight = (component, action, next) => {
  const { height } = action.payload;
  const $iFrame = $(component);
  if (`${height}px` !== $iFrame.css('height')) {
    $iFrame.css('height', `${height}px`);
  }
  next(action);
};
