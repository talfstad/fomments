import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const fommentsContainer = document.getElementById('fomments');
if (fommentsContainer) {
  const sectionId = fommentsContainer.getAttribute('data-section-id');
  const productName = fommentsContainer.getAttribute('data-product-name');
  ReactDOM.render(
    <App
      productName={productName}
      sectionId={sectionId}
    />, fommentsContainer);
}
