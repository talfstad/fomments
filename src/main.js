import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const fommentsContainer = document.getElementById('fomments');
const sectionId = fommentsContainer.getAttribute('section-id');
ReactDOM.render(<App sectionId={sectionId} />, fommentsContainer);
