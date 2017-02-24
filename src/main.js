import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

// Provider at parent level to access parent localStorage
// to give each client their own experience
ReactDOM.render(<App />, document.querySelector('#fomments'));
