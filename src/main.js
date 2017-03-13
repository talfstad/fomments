import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const fommentsContainer = document.getElementById('fomments');
if (fommentsContainer) {
  const sectionId = fommentsContainer.getAttribute('section-id');
  const productName = fommentsContainer.getAttribute('product-name');
  ReactDOM.render(
    <App
      productName={productName}
      sectionId={sectionId}
    />, fommentsContainer);
}
